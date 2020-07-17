// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory, TurnContext } = require('botbuilder');
//const { ActivityHandler, ActionTypes, ActivityTypes, CardFactory, MessageFactory } = require('botbuilder');
const book = require('./getBook')
const branch = require('./getBranchCode')
const predict = require('./predict')
const information = require('./getBookInformation')
const cron = require('node-cron');

class MyBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const text = context.activity.text;
            if (text == "목적 알려주세요" || text == "목적알려주세요") {
                await context.sendActivity(`현대인들의 저조한 독서율을 올리기 위해 도서 추천을 해줍니다.`);
                await next();
            }
            else if (text == '베스트셀러') {
                const bestSeller = book.bestSeller;
                console.log(bestSeller);
                var replyText = ``;
                for (var i in bestSeller) {
                    console.log(bestSeller[i].title);
                    replyText += `${Number(i) + 1}위 : ${bestSeller[i].title}\n${bestSeller[i].uri}\n\n`
                }
                console.log(replyText);
                await context.sendActivity(replyText);
                await this.sendSuggestedActions(context);
                await next();
            }
            else if (text == '화제의 신작') {
                const newBooks = book.newBooks;
                console.log(newBooks);
                var replyText = ``;
                for (var i in newBooks) {
                    console.log(newBooks[i].title);
                    replyText += `-${newBooks[i].title}\n\n`
                }
                console.log(replyText);
                await context.sendActivity(replyText);
                await this.sendSuggestedActions(context);
                await next();
            }
            else if (text == '교보문고 지점목록') {
                const branchName = Object.keys(branch.branchList);
                console.log(branchName);
                var replyText = ``;
                for (var i in branchName) {
                    if (i == 0 || i == 16 || i == 29) {
                        replyText += `\n\n${branchName[i]}\n/`
                    }
                    else {
                        replyText += `${branchName[i]}\n,`
                    }
                }
                await context.sendActivity(replyText);
                await this.sendSuggestedActions(context);
                await next();
            }
            else if (text == '종료') {
                await context.sendActivity(`감사합니다~^^`);
            }
            else {
                var replyText;
                var infoObj;
                var conversationReferences = {};
                var adapter;
                const currentUser = context.activity.from.id;
                conversationReferences[currentUser] = TurnContext.getConversationReference(context.activity);
                adapter = context.adapter;
                predict.getPrediction(text).then(res => {
                    var predictObj = res;
                    var score = predictObj.score;
                    var bookName = predictObj.bookName;
                    var branch = predictObj.branch;
                    information.getBookLocation(bookName, branch);
                    setTimeout(function () {
                        infoObj = information.bookInformation;
                        replyText = infoObj.stock + `\n위치 : ` + infoObj.location;
                        console.log(replyText);

                        cron.schedule('* * * * * *', async function () {
                            await adapter.continueConversation(conversationReferences[currentUser], async turnContext => {
                                await turnContext.sendActivity(replyText);
                            });
                        });
                    }, 1500);
                });
                await next();
            }
        });
        this.onConversationUpdate(async (context, next) => {
            await context.sendActivity('어서오세요');
            await context.sendActivity('목적을 알고 싶으면 "목적 알려주세요"를 입력해주세요');
            await this.sendSuggestedActions(context);
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }

    async sendSuggestedActions(turnContext) {
        var reply = MessageFactory.suggestedActions(['베스트셀러', '화제의 신작', '교보문고 지점목록', '종료'], '무엇을 보고싶나요?');
        await turnContext.sendActivity(reply);
    }
}

module.exports.MyBot = MyBot; 