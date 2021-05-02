var express = require('express')
const axios = require('axios');
var bodyParser = require('body-parser')
var awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')

const TELEGRAM_URL = 'https://api.telegram.org/bot'
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN

// declare a new express app
var app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "*")
  next()
})


/**********************
 * Bot handler *
 **********************/
async function getConfig() {
   // get config from graphql
}

async function sendToUser(chat_id, text) {
  return await axios({
    url: `${TELEGRAM_URL}${TELEGRAM_TOKEN}/sendMessage`,
    method: 'POST',
    data: {
      chat_id,
      text
    }
  })
}

app.post('/', async (req, res) => {
  //message
  const chatId = req.body.message.chat.id
  const sentMessage = req.body.message.text

  // do stuff

  // respond
  await sendToUser(chatId, sentMessage)

  //200 response must be sent or telegram will repeatedly send the message
  res.sendStatus(200)
})

/****************************
* Start app *
****************************/

app.listen(3000, function() {
    console.log("App started")
})

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app
