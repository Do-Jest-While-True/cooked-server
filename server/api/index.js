const router = require('express').Router()
const recipes = require('./recipes')
const users = require('./users')
const comments = require('./comments')

// USE api/recipes
router.use('/recipes', recipes)
router.use('/users', users)
router.use('/comments', comments)

router.use((req, res, next) => {
  const err = new Error('API route not found')
  err.status = 404
  next(err)
})

module.exports = router
