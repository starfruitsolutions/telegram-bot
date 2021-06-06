const axios = require('axios')

/**********************
 * environment constants *
 **********************/
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN

/**********************
 * process *
 **********************/

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
exports.handler = async (event, context) => {
  console.log(process.env)
  try {
    console.log('parse body')
    const body = JSON.parse(event.body)
    console.log(body)

    await sendMessage(event.pathParameters.botKey, body.channel, body.message)
  }
  catch(error) {
    return {
        statusCode: 500,
        body: JSON.stringify("Message failed")
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Message sent")
  }
}
