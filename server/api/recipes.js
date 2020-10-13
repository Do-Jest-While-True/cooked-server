const router = require('express').Router()
const { Recipe } = require('../db/models')

// GET /api/recipes
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll()
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
