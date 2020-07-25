# publicSpeakerBot

현대인들에게 도서를 쉽게 접할 수 있도록 도서를 추천해주고 도서의 위치를 알려주는 챗봇입니다.

베스트셀러를 비롯한 신작도서와 교보문고의 지점 목록을 보여줍니다.

더 나아가 사용자가 구매하고자 하는 도서의 재고와 위치를 한 번에 파악할 수 있습니다.

## Prerequisites

- [Node.js](https://nodejs.org) version 10.14.1 or higher
- [Bot framework Emulator]
- [Visual Studio] 2017 or higher
- [Luis]

## To run the bot

- Install modules
    npm install iconv-lite
    npm install request-promise
    npm install cheerio
    npm install dotenv
    npm install axios

- Start the bot
    npm start

## Testing the bot using Bot Framework Emulator

- Install the Bot Framework Emulator version 4.9.0 or greater from [here](https://github.com/Microsoft/BotFramework-Emulator/releases)
- Enter the path where the project is stored in the cmd window, go to the location
- Enter npm start to confirm that Bot is executed.


### Connect to the bot using Bot Framework Emulator

- Launch Bot Framework Emulator
- File -> Open Bot
- Enter a Bot URL of `http://localhost:3978/api/messages`

## Deploy the bot to Azure

- Compress the files of your own bot.
- Create new resource groups and resources after joining from Azure homepage.
- In the cmd window, type 'az login' and log in to Azure.
- Enter 'az bot prepare-deploy --code-dir "." --lang Javascript' to install web.config.
- Enter 'az webapp deployment source config-zip --resource-group "resource group name" --name "resource name created" --src "compressed file path"'.
- After a few minutes, check if the distribution has been completed by running a test on the web chat from the resource on the Azure homepage to see if it works.
- https://docs.microsoft.com/ko-kr/azure/bot-service/bot-builder-deploy-az-cli?view=azure-bot-service-4.0&viewFallbackFrom=azure-bot-servi&tabs=javascript

## Further reading

- [Bot Framework Documentation](https://docs.botframework.com)
- [Bot Basics](https://docs.microsoft.com/azure/bot-service/bot-builder-basics?view=azure-bot-service-4.0)
- [Dialogs](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-dialog?view=azure-bot-service-4.0)
- [Gathering Input Using Prompts](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-prompts?view=azure-bot-service-4.0)
- [Activity processing](https://docs.microsoft.com/en-us/azure/bot-service/bot-builder-concept-activity-processing?view=azure-bot-service-4.0)
- [Azure Bot Service Introduction](https://docs.microsoft.com/azure/bot-service/bot-service-overview-introduction?view=azure-bot-service-4.0)
- [Azure Bot Service Documentation](https://docs.microsoft.com/azure/bot-service/?view=azure-bot-service-4.0)
- [Azure CLI](https://docs.microsoft.com/cli/azure/?view=azure-cli-latest)
- [Azure Portal](https://portal.azure.com)
- [Language Understanding using LUIS](https://docs.microsoft.com/en-us/azure/cognitive-services/luis/)
- [Channels and Bot Connector Service](https://docs.microsoft.com/en-us/azure/bot-service/bot-concepts?view=azure-bot-service-4.0)
- [Restify](https://www.npmjs.com/package/restify)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Example of use
 ### best-selling search
 - input : click '베스트셀러' button
 - output : 

1위 : 부의 대이동 http://book.naver.com/bookdb/book_detail.nhn?bid=16416141

2위 : 김미경의 리부트 http://book.naver.com/bookdb/book_detail.nhn?bid=16387306

3위 : 돈의 속성 http://book.naver.com/bookdb/book_detail.nhn?bid=16371940

4위 : 킵고잉 http://book.naver.com/bookdb/book_detail.nhn?bid=16416952

5위 : 더 해빙 http://book.naver.com/bookdb/book_detail.nhn?bid=16273522

6위 : 흔한 남매 5 http://book.naver.com/bookdb/book_detail.nhn?bid=16384869

7위 : 만남은 지겹고 이별은 지쳤다 http://book.naver.com/bookdb/book_detail.nhn?bid=16387406

8위 : 하고 싶은 대로 살아도 괜찮아 http://book.naver.com/bookdb/book_detail.nhn?bid=13453869

9위 : 설민석의 한국사 대모험. 14 http://book.naver.com/bookdb/book_detail.nhn?bid=16379655

10위 : 내가 원하는 것을 나도 모를 때 http://book.naver.com/bookdb/book_detail.nhn?bid=16033672
 ### a search for new books
 - input : click '화제의 신작' button
 
 - output : 
 
 나는 나로 살기로 했다/애쓰지 않고 편안하게/김수현 작가 신작 힐링 에세이

살림 모리와 함께한 화요일 + 다 괜찮아요 천국이 말했다 (전2권) (미치 앨봄 신작)

천년의 질문 1 2 3 (선물) 책 신간 신작 소설 조정래

new 신작 연애 모의고사 (2권 구성, OMR카드 포함)

고 온 Go On 1+2 세트 (전2권) -작가 더글라스 케네디 신작장편소설

 ### printing of book branch
 -input : click '교보문고 지점목록' button
 
 -output : 
 
 서울 /광화문점 ,가든파이브 바로드림센터 ,강남점 ,동대문 바로드림센터 ,디큐브시티 바로드림센터 ,목동점 ,서울대 교내서점 ,수유 바로드림센터 ,영등포점 ,은평 바로드림센터 ,이화여대 교내서점 ,잠실점 ,천호점 ,청량리 바로드림센터 ,합정점 ,

수도권 /가천대 교내서점 ,광교점 ,광교 월드스퀘어센터 ,부천점 ,분당점 ,성균관대 교내서점 ,송도 바로드림센터 ,인천점 ,일산점 ,판교 바로드림센터 ,평촌점 , ,

지방 /경성대·부경대 센터 ,광주상무센터 ,대구점 ,대전점 ,반월당 바로드림센터 ,부산점 ,세종 바로드림센터 ,센텀시티점 ,울산점 ,전북대 교내서점 ,전주 바로드림센터 ,창원점 ,천안점 ,칠곡 센터 ,포항공대 교내서점 ,해운대 바로드림센터

 ### book inventory and location search
- input : 강남점에 어린왕자 어디에 있어?
- output :  재고 : 8부
            위치 : [G28-1]세계문학베스트
            
-![위치 사진](http://image.kyobobook.co.kr/newimages/apps/b2c/kiosk/new/map/15_print_Smap_G.gif)

## 참고
-[설명 영상]https://www.youtube.com/watch?v=2nizlN-NOHk&feature=youtu.be

-[시연 영상]https://www.youtube.com/watch?v=3v62mY2UBGU&feature=youtu.be

