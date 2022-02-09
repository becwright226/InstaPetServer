const { Sequelize } = require("sequelize");

const db = new Sequelize(process.env.DB_CONNECTION_STRING);

// Database connection string
// <db type>://<username>:<password>@ip:port/<db name>
// postgres://postgres:dbLocal@localhost:5432/pie

module.exports = db;
