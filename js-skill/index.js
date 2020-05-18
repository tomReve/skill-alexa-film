const Alexa = require('ask-sdk-core');
const http = require('https');

function maFonction() {
  return new Promise(((resolve, reject) => {
    var options = {
        host: 'tom-reversez.fr',
        port: 443,
        path: '/alexa/alexa.php',
        method: 'GET',
    };
   
    const request = http.request(options, (response) => {
      response.setEncoding('utf-8');
      let returnData = '';
      console.log(response);

      response.on('data', (chunk) => {
          console.log(chunk);
        returnData += chunk;
      });

      response.on('end', () => {
        resolve(returnData);
      });

      response.on('error', (error) => {
        reject(error);
      });
    });
    request.end();
  }));
}


const monpremiermessage = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
        },
    async handle(handlerInput) {
 
        const lareponse = await maFonction();

        return handlerInput.responseBuilder.speak(lareponse).getResponse();
        }
   };


exports.handler = Alexa.SkillBuilders.custom().addRequestHandlers(  monpremiermessage ).lambda();