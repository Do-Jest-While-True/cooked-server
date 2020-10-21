const Sequelize = require('sequelize')
const db = require('../db')

const Thread = db.define('thread', {
  userA: {
    type: Sequelize.INTEGER,
  },
  userB: {
    type: Sequelize.INTEGER,
  },
})

module.exports = Thread
