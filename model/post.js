const { DataTypes } = require('sequelize');
const db = require('../db')

const PostModel = db.define('post', {
  image: {
    type: DataTypes.STRING(1000),
    allowNull: false
  },
  desc: {
    type: DataTypes.STRING(250),
    allowNull: true
  },
  petType: {
    type: DataTypes.STRING(),
    allowNull: false
  }
})