const router = require('express').Router()
const { Comment, User } = require('../db/models')
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
