const router = require('express').Router()
const { Comment, User, Recipe } = require('../db/models')
module.exports = router

// GET /api/comments
// TODO: Is this route necessary?
router.get('/', async (req, res, next) => {
  try {
    const comments = await Comment.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: User,
          attributes: [
            'id',
            'firstName',
            'lastName',
            'email',
            'profileImageUrl',
          ],
        },
      ],
    })
    res.json(comments)
  } catch (error) {
    next(error)
  }
})

//POST api/comments/:recipeId
router.post('/:recipeId', async (req, res, next) => {
  try {
    const newComment = await Comment.create({
      userId: req.user.id,
      recipeId: req.params.recipeId,
      body: req.body.comment,
    })
    const comment = await Comment.findOne({
      where: { id: newComment.id },
      include: [{ model: User, attributes: ['username', 'profileImageUrl'] }],
    })
    res.json(comment)
  } catch (error) {
    next(error)
  }
})

//delete api/comments/:recipeId
router.delete('/:commentId', async (req, res, next) => {
  try {
    const comment = await Comment.findOne({
      where: {
        id: req.params.commentId,
      },
    })
    if (req.user.id === comment.userId) {
      await comment.destroy()
      res.sendStatus(204)
    } else res.sendStatus(403)
  } catch (error) {
    next(error)
  }
})
