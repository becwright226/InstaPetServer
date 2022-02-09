require("dotenv").config();
const Express = require('express');
const app = Express();
const dbConnection = require('./db');

app.use(require('./model/headers'))
app.use(Express.json());

const controllers = require('./controllers');

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(3001, () => {
        console.log(`[Server]: App is listening on 3001.`);
    });
})

.catch((err) => {
    console.log(`[server]: Server crashed. Error = ${err}`);
});
