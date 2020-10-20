const Sequelize = require('sequelize')
const db = require('../db')

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  profileImageUrl: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue:
      'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png',
    validate: {
      notEmpty: true,
    },
  },
  email: {
    type: Sequelize.TEXT,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true,
    },
  },
  password: {
    type: Sequelize.STRING,
    // validate: {
    //   len: [8, 24],
    //   notEmpty: true
    // },
  },
  googleId: {
    type: Sequelize.STRING,
  },
})

module.exports = User
