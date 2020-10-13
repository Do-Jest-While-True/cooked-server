const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.TEXT,
  },
  time: {
    type: Sequelize.STRING,
  },
  ingredients: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  directions: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
  },
})

module.exports = Recipe
