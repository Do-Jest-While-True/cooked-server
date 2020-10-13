const router = require('express').Router()
const { Recipe, Comment, User } = require('../db/models')

// GET /api/recipes (All recipes)
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
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
    })
    res.json(recipe)
  } catch (error) {
    next(error)
  }
})

module.exports = router
