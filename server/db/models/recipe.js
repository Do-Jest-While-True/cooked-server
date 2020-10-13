const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    // validate: {
    //   notEmpty: true,
    // },
  },
  time: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: true,
    },
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    validate: {
      notEmpty: true,
    },
  },
  directions: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
    validate: {
      notEmpty: true,
    },
  },
})

module.exports = Recipe
