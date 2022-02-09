require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

app.use(require('./middleware/headers'))
app.use(Express.json());

const controllers = require('./controllers');
