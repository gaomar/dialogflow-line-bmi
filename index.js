'use strict';
const {WebhookClient} = require('dialogflow-fulfillment');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

function bmiintent(agent) {
    const bmiVal = (parseFloat(agent.parameters.weight) / (parseFloat(agent.parameters.height)/100 * parseFloat(agent.parameters.height)/100)).toFixed(1);
    let speechText = `あなたのBMIは${bmiVal}です。`;
    agent.add(speechText);
}

function WebhookProcessing(req, res) {
    const agent = new WebhookClient({ request: req, response: res });
       
    let intentMap = new Map();
    intentMap.set('BMIIntent', bmiintent);
    agent.handleRequest(intentMap);
  
}

app.post('/', function (req, res) {
    WebhookProcessing(req, res);
});

app.listen(3000, function () {
    console.log(`Webhook listening on port 3000!`);
})
