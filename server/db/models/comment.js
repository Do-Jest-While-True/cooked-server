const Sequelize = require('sequelize')
const db = require('../db')

const Comment = db.define('comment', {
  body: {
    type: Sequelize.STRING,
  },
})

module.exports = Comment
