const router = require('express').Router()
const { Recipe, Comment, User, Follower, Like } = require('../db/models')

// GET /api/recipes/all (All recipes)
router.get('/all', async (req, res, next) => {
  try {
    const recipes = await Recipe.findAll({
      include: [{ model: User }, { model: Like }],
      order: [['createdAt', 'DESC']],
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
          include: [{ model: User }, { model: Like }],
          order: [['createdAt', 'DESC']],
        })
        recipeArray.push(...feedRecipe)
        recipeArray.sort((a, b) => b.createdAt - a.createdAt)
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
    const recipe = await Recipe.findOne({
      where: {
        id: req.params.recipeId,
      },
    })
    const comments = await Comment.findAll({
      where: {
        recipeId: req.params.recipeId,
      },
      include: [
        {
          model: User,
          attributes: ['username', 'profileImageUrl'],
        },
      ],
      order: [['createdAt', 'ASC']],
    })
    const singleRecipe = {
      recipe,
      comments,
    }
    res.json(singleRecipe)
  } catch (error) {
    next(error)
  }
})

//POST api/recipes/like/:recipeId
router.post('/like/:recipeId', async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      where: {
        id: req.params.recipeId,
      },
      include: [{ model: Comment }, { model: Like }],
    })
    const like = await Like.create({
      userId: req.user.id,
      recipeId: recipe.id,
    })
    await recipe.setLikes(like)
    res.status(201).json(like)
  } catch (error) {
    next(error)
  }
})

//delete api/recipes/like/:recipeId
router.delete('/like/:recipeId', async (req, res, next) => {
  try {
    const recipe = await Recipe.findOne({
      where: {
        id: req.params.recipeId,
      },
      include: [{ model: Comment }, { model: Like }],
    })
    const like = await Like.findOne({
      where: {
        userId: req.user.id,
        recipeId: recipe.id,
      },
    })
    await like.destroy()
    // console.log(Object.keys(recipe.__proto__))
    res.status(201).json(recipe)
  } catch (error) {
    next(error)
  }
})

//GET api/recipes/likes/all
router.get('/like/all', async (req, res, next) => {
  try {
    const recipeLikes = await Like.findAll({
      where: {
        userId: req.user.id,
      },
    })
    res.json(recipeLikes)
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
      // include: [{ model: Comment, include: [{ model: User }] }],
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
