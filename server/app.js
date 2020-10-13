const express = require('express')
const passport = require('passport')
const compression = require('compression')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const db = require('./db')
const sessionStore = new SequelizeStore({ db })
const { User } = require('./db/models')
const app = express()
// const morgan = require('morgan') // comment out before deployment to heroku

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

// Logging middleware
// app.use(morgan('dev')) // comment out before deployment to heroku

// Body parsing middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(compression())

app.use(
  session({
    secret: 'recipe secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use('/api', require('./api'))
app.use('/auth', require('./auth'))

// handle 404s -- need to create a Not Found Page
app.use((req, res, next) => {
  res.status(404).send(/* Not Found Page */)
})

// handle any errors
app.use((err, req, res, next) => {
  console.error(err)
  res.status(err.status || 500).send(err.message)
})

module.exports = app
