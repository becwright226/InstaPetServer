//code for app.js
require("dotenv").config();
const Express = require("express");
const app = Express();
const dbConnection = require("./db");

const controllers = require("./controllers");
const headers = require("./model")

app.use(Express.json());

app.use(headers.CORS)

dbConnection.authenticate()
    .then(()=> dbConnection.sync())
    .then (() => {
        console.log(`[Server]: app.js is listening on 1150`)
    })

.catch((err) => console.log(err))


app.listen(process.env.PORT, () => {
    console.log(`[server] app.js is listening on 1150`)
})


app.get('/', (req, res) => {
    res.send("I love animals!")
})