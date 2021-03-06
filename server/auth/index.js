const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: { email: req.body.email },
    })
    if (!user) {
      console.log(`No user found: ${req.body.email}`)
      res.status(401).send('Wrong username and/or password')
    } else if (user.password !== req.body.password) {
      res.status(401).send('Wrong username and/or password')
    } else {
      req.login(user, (error) => (error ? next(error) : res.json(user)))
    }
  } catch (error) {
    next(error)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body, {
      fields: [
        'firstName',
        'lastName',
        'email',
        'profileImageUrl',
        'password',
        'username',
      ],
    })
    req.login(user, (error) => (error ? next(error) : res.json(user)))
  } catch (error) {
    // if (error.errors[0].message) res.json('Email already registered!');
    next(error)
  }
})

router.post('/logout', (req, res) => {
  req.logout()
  req.session.destroy()
  res.sendStatus(200)
})

router.get('/me', (req, res) => {
  if (!req.user) {
    res.status(404).send('Not logged in')
  } else {
    res.json(req.user)
  }
})
