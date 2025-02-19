const express = require("express")
const bodyParser = require('body-parser');
const twilio = require("./modules/twilio")
const { MessagingResponse } = require('twilio').twiml;
require('dotenv').config();
const file = require("./modules/fs");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT

app.get("", (req, res) => {
    //call send_message
     res.status(200).send("<h1>Messenger v1.0</h1>")
  })

app.get("/send-wpp", (req, res) => {
  //call send_message
  twilio.sendWhatsApp()
   res.status(200).send("<h1>Wpp Message sended success!</h1>")
})

app.get("/send-sms", (req, res) => {
    //call send_message
    twilio.sendSMS();
     res.status(200).send("<h1>SMS sended success!</h1>")
  })
  
//crie uma rota para receber a mensagem do whatsapp
app.post('/receive-wpp', (req, res) => {
  const twiml = new MessagingResponse();
  const message = req.body.Body;
  const from = req.body.From;

  const date = (new Date()).toLocaleDateString("pt-BR");
  file.editFile(
    "../storage", 
    "message.txt", 
    date+": "+from+" - "+message
  )

  twilio.sendWhatsApp()
  console.log(`Mensagem recebida de ${from}: ${message}`);

  twiml.message('Obrigado pela sua mensagem! Estaremos respondendo em breve!');

  res.writeHead(200, { 'Content-Type': 'text/xml' });
  res.end(twiml.toString());
}); 


app.listen(port, () => {
    console.log("Servidor rodando na porta 8080")
})