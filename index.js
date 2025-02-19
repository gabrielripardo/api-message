const express = require("express");
const bodyParser = require('body-parser');
const routes = require("./modules/routes");
require('dotenv').config();

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
const port = process.env.PORT;

app.use("/", routes);

app.listen(port, () => {
    console.log("Servidor rodando na porta", port);
});