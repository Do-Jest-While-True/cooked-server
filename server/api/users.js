const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'firstName', 'lastName', 'email', 'profileImageUrl'],
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})
