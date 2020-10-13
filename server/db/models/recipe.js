const Sequelize = require('sequelize')
const db = require('../db')

const Recipe = db.define('recipe', {
  name: {
    type: Sequelize.STRING,
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      'https://res.cloudinary.com/cooked-images/image/upload/v1602617585/yf0ed8sepdpgeu0f18jz.jpg',
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
