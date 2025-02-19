console.log("Twilo")

require('dotenv').config();
const twilio = require("twilio");

console.log("process.env.TWILIO_SID ", process.env.TWILIO_SID)

const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_TOKEN;
const fromNumber = process.env.TWILIO_NUMBER_SMS;
const fromNumberWpp = process.env.TWILIO_NUMBER_WPP;
const client = new twilio(accountSid, authToken);

const receiverNumber = "+5561992506153"

function sendWhatsApp(toNumber=receiverNumber, message="Olá, mensagem enviada via Twilio!"){
    client.messages
    .create({
        from: 'whatsapp:'+fromNumberWpp,
        contentSid: 'HXb5b62575e6e4ff6129ad7c8efe1f983e',
        contentVariables: '{"1":"12/1","2":"3pm"}',
        // body: "Olá cliente",
        to: 'whatsapp:'+toNumber
})
    .then(message => console.log("Mensagem enviada:"))
    .catch(error => console.error("Erro ao enviar:", error));
}  

function sendSMS(toNumber=receiverNumber, message="Olá, mensagem enviada via Twilio!"){
    client.messages
  .create({
    body: message,
    from: fromNumber,
    to: toNumber
  })
  .then(message => console.log("Mensagem enviada:"))
    .catch(error => console.error("Erro ao enviar:", error));
}

module.exports = {
    sendWhatsApp,
    sendSMS
}
