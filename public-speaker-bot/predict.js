//
// This quickstart shows how to predict the intent of an utterance by using the LUIS REST APIs.
//
require("dotenv").config();
var requestPromise = require('request-promise');
var queryString = require('querystring');

// Analyze a string utterance.
module.exports.getPrediction = async (str) => {
    const LUIS_appId = process.env.LUISAPPID;
    const LUIS_predictionKey = process.env.LUISPREDICTIONKEY;
    const LUIS_endpoint = process.env.LUISENDPOINT;

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
    
    const score = response.prediction.intents.위치.score;
    const userBookName = response.prediction.entities.책[1].이름[0];
    const userBranch = response.prediction.entities.책[0].지점[0];

    var predictObj = {
        'score' : score,
        'bookName' : userBookName,
        'branch' : userBranch
    };

    return predictObj;
}