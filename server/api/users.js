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

//POST api/users/follow/:followingId
// :followingId is the person that you would like to follow, the persons page you should be on
router.post('/follow/:followingId', async (req, res, next) => {
  try {
    await Follower.create({
      followedById: req.user.id,
      followingId: req.params.followingId,
    })
    res.status(201)
    res.json()
  } catch (error) {
    next(error)
  }
})

//DELETE api/users/follow/:followingId
// :followedId is the person that you would like to unfollow, the persons page you should be on
router.delete('/follow/:followingId', async (req, res, next) => {
  try {
    await Follower.destroy({
      where: {
        followedById: req.user.id,
        followingId: req.params.followingId,
      },
    })
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

// PUT /api/users/profileImage
router.put('/profileImage', async (req, res, next) => {
  try {
    await User.update(
      { profileImageUrl: req.body.profileImageUrl },
      {
        where: {
          id: req.user.id,
        },
      }
    )
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

// PUT /api/users/username -- route should be refactored and reused to other field updates
router.put('/username', async (req, res, next) => {
  try {
    await User.update(
      { username: req.body.newUsername },
      {
        where: {
          id: req.user.id,
        },
      }
    )
    res.sendStatus(204)
  } catch (error) {
    // console.log(error.errors[0].message);
    // if (error.errors[0].message) res.json('Username already taken!');
    next(error)
  }
})
