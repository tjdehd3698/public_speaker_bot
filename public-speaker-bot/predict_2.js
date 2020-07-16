//
// This quickstart shows how to predict the intent of an utterance by using the LUIS REST APIs.
//
require("dotenv").config();
var requestPromise = require('request-promise');
var queryString = require('querystring');

// Analyze a string utterance.
module.exports.getPrediction = async (str) => {
    // YOUR-APP-ID: The App ID GUID found on the www.luis.ai Application Settings page.
    const LUIS_appId = process.env.LUISAPPID;

    // YOUR-PREDICTION-KEY: Your LUIS authoring key, 32 character value.
    const LUIS_predictionKey = process.env.LUISPREDICTIONKEY;

    // YOUR-PREDICTION-ENDPOINT: Replace this with your authoring key endpoint.
    const LUIS_endpoint = process.env.LUISENDPOINT;

    // The utterance you want to use.
    //response.writeHead(200, { 'Content-Type': 'text/html;charset=UTF-8' });
    var utterance = "포항공대점에 말센스 어디 있어?";

    // Create query string
    const queryParams = {
        "show-all-intents": true,
        "verbose": true,
        "query": str,
        "subscription-key": LUIS_predictionKey
    }

    // Create the URI for the REST call.
    const URI = `${LUIS_endpoint}luis/prediction/v3.0/apps/${LUIS_appId}/slots/production/predict?${queryString.stringify(queryParams)}`

    // Send the REST call.
    const response = JSON.parse(await requestPromise(URI));
    //console.log(response);
    // fs.writeFileSync('bookInformation.jason',response)
    // Display the response from the REST call.
    
    const score = response.prediction.intents.위치.score;
    const userBookName = response.prediction.entities.책[1].이름[0];
    const userBranch = response.prediction.entities.책[0].지점[0];

    /*
    console.log('적합성 : '+score);
    console.log('책이름 : '+userBookName);
    console.log('지점 : '+userBranch);
    */

    var predictObj = {
        'score' : score,
        'bookName' : userBookName,
        'branch' : userBranch
    };
    //console.log(predictObj);
    return predictObj;
}

// Pass an utterance to the sample LUIS app
//getPrediction().then(() => console.log("done")).catch((err) => console.log(err));