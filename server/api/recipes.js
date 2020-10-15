const router = require('express').Router()
const { Recipe, Comment, User, Follower } = require('../db/models')

// GET /api/recipes/all (All recipes)
router.get('/all', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      include: [{ model: Comment }],
    })
    res.json(recipes)
  } catch (error) {
    next(error)
  }
})

//GET api/recipes/feed
router.get('/feed', async (req, res, next) => {
  const user = req.user
  const recipeArray = []
  try {
    if (user) {
      const following = await Follower.findAll({
        where: { followedById: req.user.id },
        attributes: ['followingId'],
      })
      for (let i = 0; i < following.length; i++) {
        const feedRecipe = await Recipe.findAll({
          where: {
            userId: following[i].followingId,
          },
          include: [{ model: User }],
          order: [['createdAt', 'DESC']],
        })
        recipeArray.push(...feedRecipe)
      }
      res.json(recipeArray)
    }
  } catch (error) {
    next(error)
  }
})

//GET api/recipes/singleRecipe/:recipeId
router.get('/singlerecipe/:recipeId', async (req, res, next) => {
  try {
    const recipes = await Recipe.findOne({
      where: {
        id: req.params.recipeId,
      },
      include: [{ model: Comment }],
    })
    res.json(recipes)
  } catch (error) {
    next(error)
  }
})

// GET /api/recipes/:userId (All recipes for a single user)
// Recipes includes comments, comments includes user
router.get('/:userId', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      where: { userId: req.params.userId },
      include: [{ model: Comment, include: [{ model: User }] }],
    })
    res.json(recipes)
  } catch (error) {
    next(error)
  }
})

// POST /api/recipes
router.post('/', async (req, res, next) => {
  try {
    const { name, time, ingredients, directions, imageUrl } = req.body
    const recipe = await Recipe.create({
      name,
      time,
      ingredients,
      directions,
      imageUrl,
      userId: req.user.id,
    })
    res.json(recipe)
  } catch (error) {
    next(error)
  }
})

module.exports = router
