const router = require('express').Router()
const { User, Recipe } = require('../db/models')
module.exports = router

// GET all users
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

// GET single user, their followers, and recipes
router.get('/:userId', async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'profileImageUrl'],
      include: [{ model: Recipe }, { model: User, as: 'follower' }],
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

// GET single user with a single recipe
router.get('/:userId/:recipeId', async (req, res, next) => {
  try {
    const users = await User.findByPk(req.params.userId, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'profileImageUrl'],
      include: [{ model: Recipe, where: { id: req.params.recipeId } }],
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})
