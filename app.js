require("./config/database");
const bodyParser = require("body-parser");
const express = require("express");
const routes = require("./routes");
const { errorhandler } = require("./middlewares/error.handler.middleware");

const app = express();

//MiddleWares
app.use(bodyParser.json());

//Routes
app.use("/api", routes);

//Error Handler
app.use(errorhandler);

module.exports = app;
