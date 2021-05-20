/* Amplify Params - DO NOT EDIT
	API_BOT_GRAPHQLAPIENDPOINTOUTPUT
	API_BOT_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const axios = require('axios')
var Mustache = require('mustache')
const Wax = require('@jvitela/mustache-wax')

/**********************
 * graphql *
 **********************/
const {GraphQLGateway, IAMCredentialsStrategy} = require('@crft/appsync-gateway')
const creds = new IAMCredentialsStrategy();
const gateway = new GraphQLGateway(
  creds,
  process.env.API_BOT_GRAPHQLAPIENDPOINTOUTPUT
)

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

 /**********************
  * templating *
  **********************/
Wax(Mustache)
Mustache.Formatters = {
  "add": function (one, two) {
    return Number(one) + Number(two)
  },
  "subtract": function (one, two) {
    return Number(one) - Number(two)
  },
  "multiply": function (one, two) {
    return Number(one) * Number(two)
  },
  "divide": function (one, two) {
    return Number(one) / Number(two)
  }
}

function render(template, data){
  console.log('render template')
  return Mustache.render(template, data)
}

/**********************
 * process *
 **********************/
function parseCommand(message) {
 console.log('parse command')
 // if it's not a command stop
 if(!message.entities || message.entities[0].type != 'bot_command' || message.entities[0].offset != '0'){
   console.log('not a command')
   return false
 }

 var args = message.text.match(/^.*?(?=[@\s]|$)|(?<=\s').+?(?='(?:\s|$))|(?<=\s").+?(?="(?:\s|$))|(?<=\s)[^"'\s]+/g)

 return args
}

async function getConfig(botID, args){
 console.log('performing query')
 return gateway.runQuery({
   operationName: 'getCommand',
   query: getCommand,
   variables: {
     bot: botID,
     name: args[0].toLowerCase() // first arg is command always lowercase
   }
 })
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

function sendMessage(botKey, chat_id, text) {
  return axios({
    url: `https://api.telegram.org/bot${botKey}/sendMessage`,
    method: 'POST',
    data: {
      chat_id,
      text
    }
  })
}

/**********************
 * Bot handler *
 **********************/
const exit = {
  statusCode: 200
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
    const response = await getConfig(event.pathParameters.botID, args)
    config = response.getBot.commands.items[0] // use first result

    var templateData = {
      args,
      message
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
    await sendMessage(event.pathParameters.botKey, message.chat.id, toSend)
  }
  catch(error) {
    console.log(error)
    return exit
  }

  // telegram must recieve a 200 statusCode to consider it settled
  return exit
}
