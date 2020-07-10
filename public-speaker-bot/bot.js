// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

const { ActivityHandler, MessageFactory } = require('botbuilder');

const book = require('./getBook')

class MyBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const text=context.activity.text;
            if (text == "목적 알려주세요"||text=="목적알려주세요") {
                await context.sendActivity(`현대인들의 저조한 독서율을 올리기 위해 도서 추천을 해줍니다.`);
                await next();
            }
            else if (text == "도서추천"||text=="도서 추천") {
                await this.sendSuggestedActions(context);
                await next();
            }
            else if(text=='베스트셀러'){
                const bestSeller=book.bestSeller;
                console.log(bestSeller);
                var replyText=``;
                for(var i in bestSeller){
                    console.log(bestSeller[i].title);
                    replyText += `${Number(i)+1}위 : ${bestSeller[i].title}\n\n`
                }
                console.log(replyText);
                await context.sendActivity(replyText);
                await next();
            }
            else if(text=='화제의 신작'){
                const newBooks=book.newBooks;
                console.log(newBooks);
                var replyText=``;
                for(var i in newBooks){
                    console.log(newBooks[i].title);
                    replyText += `-${newBooks[i].title}\n\n`
                }
                console.log(replyText);
                await context.sendActivity(replyText);
                await next();
            }
            else {
                await context.sendActivity(`You said '${context.activity.text}'`);
                // By calling next() you ensure that the next BotHandler is run.
                await next();
            }
        });
        this.onConversationUpdate(async (context, next) => {
            await context.sendActivity('어서오세요');
            await context.sendActivity('"목적 알려주세요" 또는 "도서추천"을 입력해주세요');
           // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
    async sendSuggestedActions(turnContext) {
            var reply = MessageFactory.suggestedActions(['베스트셀러', '화제의 신작', '나가기'], '무엇을 보고싶나요?');
            await turnContext.sendActivity(reply);
    }
}

module.exports.MyBot = MyBot; 