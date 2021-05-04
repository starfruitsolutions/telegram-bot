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
const API_URL = process.env.API_BOT_GRAPHQLAPIENDPOINTOUTPUT
const API_ID = process.env.API_BOT_GRAPHQLAPIIDOUTPUT
const API_KEY = process.env.API_KEY
const BOT_ID = process.env.BOT_ID

/**********************
 * Bot handler *
 **********************/
const exit = {
  statusCode: 200
}
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
  console.log('parse command')
  // if it's not a properly formed command escape
  if(!message.entities || message.entities[0].type != 'bot_command' || message.entities[0].offset != '0'){
    console.log('malformed command')
    return false
  }
  var split = message.text.split(/\s+/)

  return {
    call: split[0].split('@')[0], //tosses the @user for now
    arguments: split.slice(1)
  }
}

async function getConfig(command){
  return axios({
    url: API_URL,
    method: 'post',
    headers: {
      'Authorization': API_KEY
    },
    data: {
      query: print(getBot),
      variables: {id: BOT_ID}
    }
  })
}

exports.handler = async (event, context) => {
  console.log(process.env)

  console.log('parse body')
  const body = JSON.parse(event.body)

  console.log('get message')
  const message = body.message

  const command = parseCommand(message)
  if (!command){
    console.log('no valid command')
    return exit
  }

  // get the config for the command
  let config
  try {
    console.log('performing query')
    const response = await getConfig(command)
    config = response.data.data.getBot
  }
  catch(error) {
    console.log(error)
    return exit
  }

  // send message to telegram
  try{
    await sendMessage(message.chat.id, config)
  }
  catch(error){
    console.log(error)
  }

  // telegram must recieve a 200 statusCode to consider it settled
  return exit
}
