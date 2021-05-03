const axios = require('axios');

const TELEGRAM_URL = 'https://api.telegram.org/bot'
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN
const DEBUG_CHAT = process.env.DEBUG_CHAT

/**********************
 * Bot handler *
 **********************/
async function getConfig() {
   // get config from graphql
}

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
  if(!message.entities || message.entities[0].type != 'bot_command'){
    return false
  }
  return message.text
}

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body)

  const message = body.message

  const id = message.chat.id

  const command = parseCommand(message)

  if (!command){
    return {
      statusCode: 200
    }
  }
  await sendMessage(id, command)
  // await debug(JSON.stringify(body))

  return {
    statusCode: 200
  }
}
