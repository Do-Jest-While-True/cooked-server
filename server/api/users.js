const router = require('express').Router()
const { User, Recipe, Follower } = require('../db/models')
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
    const user = await User.findByPk(req.params.userId, {
      attributes: ['id', 'firstName', 'lastName', 'email', 'profileImageUrl'],
    })
    const following = await Follower.findAll({
      where: { followedById: req.params.userId },
      attributes: ['followingId'],
    })
    const followers = await Follower.findAll({
      where: { followingId: req.params.userId },
      attributes: ['followedById'],
    })
    const userData = {
      user,
      followers,
      following,
    }
    res.json(userData)
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
