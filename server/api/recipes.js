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

// POST /api/recipes/:recipeId
router.post('/:recipeId', async (req, res, next) => {
  try {
    const { imageUrl } = req.body
    await Recipe.update(
      { imageUrl: imageUrl },
      {
        where: {
          id: req.params.recipeId,
        },
      }
    )
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
})

module.exports = router
