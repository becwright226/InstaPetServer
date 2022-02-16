
require('dotenv').config();

const Express = require('express');
const app = Express();
const dbConnection = require('./db');

app.use(require('./model/headers'))
app.use(Express.json());

const controllers = require('./controllers');


app.use('/user', controllers.userController);
app.use('/post', controllers.postController);

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[Server]: App is listening on ${process.env.PORT}`);

    });
})

.catch((err) => {
    console.log(`[server]: Server crashed. Error = ${err}`);
});
