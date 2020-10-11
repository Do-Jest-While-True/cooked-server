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
    defaultValue:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
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
