const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
  },
  lastName: {
    type: Sequelize.STRING,
  },
  profileImageUrl: {
    type: Sequelize.TEXT,
  },
  email: {
    type: Sequelize.TEXT,
    unique: true,
    isEmail: true,
  },
  password: {
    type: Sequelize.STRING,
  },
  googleId: {
    type: Sequelize.STRING,
  },
})

module.exports = User
