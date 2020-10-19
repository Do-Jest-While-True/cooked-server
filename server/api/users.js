const router = require('express').Router()
const { User, Recipe, Follower } = require('../db/models')
module.exports = router

// GET all users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: [
        'id',
        'firstName',
        'lastName',
        'username',
        'email',
        'profileImageUrl',
      ],
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})

//PUT api/users/follow/:followingId
// :followingId is the person that you would like to follow, the persons page you should be on
router.put('/follow/:followingId', async (req, res, next) => {
  try {
    await Follower.create({
      followedById: req.user.id,
      followingId: req.params.followingId,
    })
    res.sendStatus(201)
  } catch (error) {
    next(error)
  }
})

//DELETE api/users/follow/:followingId
// :followedId is the person that you would like to unfollow, the persons page you should be on
router.delete('/follow/:followingId', async (req, res, next) => {
  try {
    const relationship = await Follower.findOne({
      where: {
        followedById: req.user.id,
        followingId: req.params.followingId,
      },
    })
    await relationship.destroy()
    // console.log(Object.keys(recipe.__proto__))
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// GET single user, their followers and followings
router.get('/:userId', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId, {
      attributes: [
        'id',
        'firstName',
        'lastName',
        'username',
        'email',
        'profileImageUrl',
      ],
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
      attributes: [
        'id',
        'firstName',
        'lastName',
        'username',
        'email',
        'profileImageUrl',
      ],
      include: [{ model: Recipe, where: { id: req.params.recipeId } }],
    })
    res.json(users)
  } catch (error) {
    next(error)
  }
})
