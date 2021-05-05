/* Amplify Params - DO NOT EDIT
	API_BOT_GRAPHQLAPIENDPOINTOUTPUT
	API_BOT_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const axios = require('axios')
var Mustache = require('mustache')
const {GraphQLGateway, IAMCredentialsStrategy} = require('@crft/appsync-gateway')
const creds = new IAMCredentialsStrategy();

const gateway = new GraphQLGateway(
  creds,
  process.env.API_BOT_GRAPHQLAPIENDPOINTOUTPUT
)

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
const getCommand = `
  query getCommand($bot: ID!, $name: String!) {
    getBot(id: $bot) {
      commands(filter: {name: {eq: $name}}) {
        items {
          name
          template
          sources {
            items {
              name
              method
              body
              url
            }
          }
        }
      }
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
  // if it's not properly formed stop
  if(!message.entities || message.entities[0].type != 'bot_command' || message.entities[0].offset != '0'){
    console.log('malformed command')
    return false
  }
  var args = message.text.split(/\s+/)
  args[0] = args[0].split('@')[0] // tosses @user

  return args
}

async function getConfig(args){
  console.log('performing query')
  return gateway.runQuery({
    operationName: 'getCommand',
    query: getCommand,
    variables: {
      bot: BOT_ID,
      name: args[0] // first arg is command
    }
  })
}

function render(template, data){
  console.log('render template')
  return Mustache.render(template, data)
}

async function fetchSources(sources, templateData){
  console.log('fetching sources')
  var data = {}

  for (i = 0; i < sources.length; i++) {
    console.log(sources[i])

    var response = await axios({
      url: render(sources[i].url, templateData), // render allows args in definition
      method: render(sources[i].method, templateData),
      data: (sources[i].body ? JSON.parse(render(sources[i].body, templateData)) : null) // can't render if null
    })
    console.log(response)
    data[sources[i].name] = response.data
  }
  return data
}

exports.handler = async (event, context) => {
  console.log(process.env)
  try {
    console.log('parse body')
    const body = JSON.parse(event.body)
    console.log(body)

    console.log('get message')
    const message = body.message
    console.log(message)

    const args = parseCommand(message)
    if (!args){
      console.log('no valid command')
      return exit
    }

  // get the config for the command
    const response = await getConfig(args)
    config = response.getBot.commands.items[0] // use first result

    var templateData = {
      args
    }
    // command arguments
    if(config.sources && config.sources.items){
      templateData.sources = await fetchSources(config.sources.items, templateData)
    }

    // render template
    console.log('rendering template')
    console.log(templateData)
    var toSend = render(config.template, templateData)

    //send the message
    console.log('Sending message')
    await sendMessage(message.chat.id, toSend)
  }
  catch(error) {
    console.log(error)
    return exit
  }

  // telegram must recieve a 200 statusCode to consider it settled
  return exit
}
