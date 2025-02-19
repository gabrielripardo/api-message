const express = require('express');
const router = express.Router();
const twilio = require("./twilio");
const { MessagingResponse } = require('twilio').twiml;
const file = require("./fs");

router.get("/", (req, res) => {
    res.status(200).send("<h1>Messenger v1.0</h1>");
});

router.get("/send-wpp", (req, res) => {
    twilio.sendWhatsApp();
    res.status(200).send("<h1>Wpp Message sended success!</h1>");
});

router.get("/send-sms", (req, res) => {
    twilio.sendSMS();
    res.status(200).send("<h1>SMS sended success!</h1>");
});

router.post('/receive-wpp', (req, res) => {
    const twiml = new MessagingResponse();
    const message = req.body.Body;
    const from = req.body.From;

    const date = (new Date()).toLocaleDateString("pt-BR");
    file.editFile(
        "../storage", 
        "message.txt", 
        date+": "+from+" - "+message
    );

    console.log(`Mensagem recebida de ${from}: ${message}`);

    twiml.message('Obrigado pela sua mensagem! Estaremos respondendo em breve!');

    res.writeHead(200, { 'Content-Type': 'text/xml' });
    res.end(twiml.toString());
});

module.exports = router;