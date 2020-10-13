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
    // could be an integer, but this way someone can say 90 minutes OR 1.5 hours
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
