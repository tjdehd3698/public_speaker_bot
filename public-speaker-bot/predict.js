//
// This quickstart shows how to predict the intent of an utterance by using the LUIS REST APIs.
//
var requestPromise = require('request-promise');
var queryString = require('querystring');

const fs = require('fs');
//const Json = require('query-json.json');

// Analyze a string utterance.
getPrediction = async () => {
    //const fs = require('fs')
    //////////
    // Values to modify.
    const utf8 = require('utf8');
    const iconv = require("iconv-lite");
    // YOUR-APP-ID: The App ID GUID found on the www.luis.ai Application Settings page.
    const LUIS_appId = "93a58891-bd1a-48fd-b48d-88dd89ad84ae";

    // YOUR-PREDICTION-KEY: Your LUIS authoring key, 32 character value.
    const LUIS_predictionKey = "751041c1212641bfa0fc5ef2eb83202d";

    // YOUR-PREDICTION-ENDPOINT: Replace this with your authoring key endpoint.
    // For example, "https://westus.api.cognitive.microsoft.com/"
    const LUIS_endpoint = "https://mybook-luis.cognitiveservices.azure.com/";
    //const utterance = " "

    var utterance = "포항공대점에 말센스 어디 있어?";

    const dataBuffer = fs.readFileSync('query-json.json')
    const dataJson = dataBuffer.toString()

    const data = JSON.parse(dataJson)
    console.log('쿼리: ' + data.query)
    console.log('적합성: ' + data.prediction.intents.위치.score)
    console.log('책이름: ' + data.prediction.entities.책[1].이름);
    console.log('지점: ' + data.prediction.entities.책[0].지점);
    //const utterance = data.query;
    

    // Create query string
    const queryParams = {
        "show-all-intents": true,
        "verbose": true,
        "query": utterance,
        "subscription-key": LUIS_predictionKey
    }

    // Create the URI for the REST call.
    const URI = `${LUIS_endpoint}luis/prediction/v3.0/apps/${LUIS_appId}/slots/production/predict?${queryString.stringify(queryParams)}`

    // Send the REST call.
    const response = await requestPromise(URI);

    const bookJson = JSON.stringify(response);


    console.log(response);
}

// Pass an utterance to the sample LUIS app
getPrediction().then(() => console.log("done")).catch((err) => console.log(err));
//exports.getPrediction = this.getPrediction;
