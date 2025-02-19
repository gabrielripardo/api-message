const express = require("express");
const serverless = require("serverless-http");
const routes = require("../modules/routes");
const app = express();

app.use("/", routes);

module.exports.handler = serverless(app);

