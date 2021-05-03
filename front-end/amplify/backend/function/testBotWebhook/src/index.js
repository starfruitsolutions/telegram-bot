/* Amplify Params - DO NOT EDIT
	API_BOT_GRAPHQLAPIENDPOINTOUTPUT
	API_BOT_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */const axios = require('axios')
const gql = require('graphql-tag')
const graphql = require('graphql')
const { print } = graphql

const TELEGRAM_URL = 'https://api.telegram.org/bot'
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const DEBUG_CHAT = process.env.DEBUG_CHAT
const BOT_ID = process.env.BOT_ID

/**********************
 * Bot handler *
 **********************/

const getBot = gql`
   query GetBot($id: ID!) {
     getBot(id: $id) {
       id
       name
       description
       commands {
         items {
           id
           name
           arguments
           template
           createdAt
           updatedAt
         }
         nextToken
       }
       createdAt
       updatedAt
     }
   }
 `
function sendMessage(chat_id, text) {
  return axios({
    url: `${TELEGRAM_URL}${TELEGRAM_TOKEN}/sendMessage`,
    method: 'POST',
    data: {
      chat_id,
      text
    }
  })
}

function debug(text) {
  return sendMessage(DEBUG_CHAT, text)
}

function parseCommand(message) {
  // if it's not a properly formed command escape
  if(!message.entities || message.entities[0].type != 'bot_command' || message.entities[0].offset != '0'){
    return false
  }
  var split = message.text.split(/\s+/)

  return {
    call: split[0].split('@')[0], //tosses the @user for now
    arguments: split.slice(1)
  }
}

function getConfig(command){
  return axios({
    url: process.env.API_BOT_GRAPHQLAPIENDPOINTOUTPUT,
    method: 'post',
    headers: {
      'x-api-key': process.env.API_BOT_GRAPHQLAPIKEYOUTPUT
    },
    data: {
      query: print(getBot),
    }
  })
}

exports.handler = async (event, context) => {
  console.log(process.env.API_BOT_GRAPHQLAPIKEYOUTPUT)
  const body = JSON.parse(event.body)

  const message = body.message

  const command = parseCommand(message)

  if (!command){
    return {
      statusCode: 200
    }
  }
  //console.log('performing query')
  //var config = await getConfig(command)
  //console.log(config)
  await sendMessage(message.chat.id, command)
  // await debug(JSON.stringify(body))

  return {
    statusCode: 200
  }
}
