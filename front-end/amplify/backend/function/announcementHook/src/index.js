const axios = require('axios')

/**********************
 * environment constants *
 **********************/
const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN

/**********************
 * process *
 **********************/

function sendMessage(chat_id, text) {
  return axios({
    url: `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`,
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
exports.handler = async (event, context) => {
  console.log(process.env)
  try {
    console.log('parse body')
    const body = JSON.parse(event.body)
    console.log(body)

    // temp auth
    if(body.token != TELEGRAM_TOKEN){
      return {
          statusCode: 500,
          body: JSON.stringify("not authorized")
      }
    }

    await sendMessage(body.channel, body.message)
  }
  catch(error) {
    return {
        statusCode: 500,
        body: JSON.stringify(error)
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify("Message sent")
  }
}
