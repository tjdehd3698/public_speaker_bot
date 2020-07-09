// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.


const { ActivityHandler, MessageFactory } = require('botbuilder');

class MyBot extends ActivityHandler {
    constructor() {
        super();
        // See https://aka.ms/about-bot-activity-message to learn more about the message and other activity types.
        this.onMessage(async (context, next) => {
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
            await context.sendActivity('Welcome');
            await this.sendSuggestedActions(context);
            // By calling next() you ensure that the next BotHandler is run.
            await next();
        });
    }
    async sendSuggestedActions(turnContext) {
        var reply = MessageFactory.suggestedActions(['베스트셀러', '화제의 신작'], '무엇을 보고싶나요?');
        await turnContext.sendActivity(reply);
    }
}

module.exports.MyBot = MyBot; 