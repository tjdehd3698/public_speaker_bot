// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.
/*
const { ActivityHandler, MessageFactory } = require('botbuilder');

class EchoBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            const replyText = `Echo: ${ context.activity.text }`;
            await context.sendActivity(MessageFactory.text(replyText, replyText));
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });

        this.onMembersAdded(async (context, next) => {
            const membersAdded = context.activity.membersAdded;
            const welcomeText = 'Hello and welcome!';
            for (let cnt = 0; cnt < membersAdded.length; ++cnt) {
                if (membersAdded[cnt].id !== context.activity.recipient.id) {
                    await context.sendActivity(MessageFactory.text(welcomeText, welcomeText));
                }
            }
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.EchoBot = EchoBot;
*/

const { ActivityHandler } = require('botbuilder');

class MyBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
            console.log(context.activity.text);
            const text=context.activity.text;
            if (text == "목적 알려주세요") {
                await context.sendActivity(`현대인들의 저조한 독서율을 올리기 위해 도서 추천을 해줍니다.`);
                await next();
            }
            else {
                await context.sendActivity(`You said '${context.activity.text}'`);
                // By calling next() you ensure that the next BotHandler is run.
                await next();
            }
        });
        this.onConversationUpdate(async (context, next) => {
            await context.sendActivity('[conversationUpdate event detected]');
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
}

module.exports.MyBot = MyBot; 