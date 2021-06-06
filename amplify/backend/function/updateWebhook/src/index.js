/* Amplify Params - DO NOT EDIT
	API_BOT_GRAPHQLAPIENDPOINTOUTPUT
	API_BOT_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */
const axios = require('axios')
const ejs = require('ejs')

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
function render(template, data){
  console.log('Template Data:', data)
  return ejs.render(template, data)
}

/**********************
 * process *
 **********************/
function parseCommand(message) {
 // if it's not a command stop
 if(!message.entities || message.entities[0].type != 'bot_command' || message.entities[0].offset != '0'){
   console.log('No command included')
   return false
 }

 var args = message.text.match(/^.*?(?=[@\s]|$)|(?<=\s').+?(?='(?:\s|$))|(?<=\s").+?(?="(?:\s|$))|(?<=\s)[^"'\s]+/g)

 return args
}

async function getConfig(botID, args){
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
 var data = {}

 for (i = 0; i < sources.length; i++) {
   console.log('Source:', sources[i])

   var response = await axios({
     url: render(sources[i].url, templateData), // render allows args in definition
     method: render(sources[i].method, templateData),
     data: (sources[i].body ? JSON.parse(render(sources[i].body, templateData)) : null) // can't render if null
   })
   console.log('Response:', response)
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
      text,
      parse_mode: 'html'
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
  console.log('Event:', event)
  try {
    const body = JSON.parse(event.body)
    console.log('Body:', body)

    const message = body.message
    console.log('Message:', message)

    const args = parseCommand(message)
    if (!args){
      console.log('Command not formatted correctly')
      return exit
    }

  // get the config for the command
    const response = await getConfig(event.pathParameters.botID, args)
    config = response.getBot.commands.items[0] // use first result
    console.log('Config:', config)

    var templateData = {
      args,
      message
    }
    // command arguments
    if(config.sources && config.sources.items){
      templateData.sources = await fetchSources(config.sources.items, templateData)
    }

    // render template
    var toSend = render(config.template, templateData)

    //send the message
    await sendMessage(event.pathParameters.botKey, message.chat.id, toSend)
  }
  catch(error) {
    console.log(error)
    return exit
  }

  // telegram must recieve a 200 statusCode to consider it settled
  return exit
}
