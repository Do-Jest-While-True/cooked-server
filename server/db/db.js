const Sequelize = require('sequelize')

const dbName = 'cooked'
const dbUrl = process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`

const db = new Sequelize(dbUrl, {
  logging: false,
  operatorAliases: false,
})

module.exports = db
