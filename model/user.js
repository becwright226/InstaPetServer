const { DataTypes } = require('sequelize');
const db = require('../db');

const UserModel = db.define("user", {
    firstName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    petName: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(),
        allowNull: false
    },
    // petType: {
    //     type: DataTypes.ENUM(),
    //     allowNull: false
    // },
});


module.exports = UserModel;