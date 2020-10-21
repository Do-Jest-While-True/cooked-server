const Sequelize = require('sequelize')
const db = require('../db')

const Message = db.define('message', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  sentBy: {
    type: Sequelize.INTEGER,
  },
  sentTo: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Message
