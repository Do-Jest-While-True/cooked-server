const router = require('express').Router()
const { Recipe } = require('../db')

// GET /api/recipes
router.get('/', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll()
    res.json(recipes)
  } catch (error) {
    next(error)
  }
})

module.exports = router
