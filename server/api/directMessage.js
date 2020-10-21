const router = require('express').Router()
const { Message, Thread } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

// GET ALL /api/directMessages/threads
router.get('/threads', async (req, res, next) => {
  try {
    const allThreads = await Thread.findAll({
      where: {
        [Op.or]: [{ userA: req.user.id }, { userB: req.user.id }],
      },
      include: [
        {
          model: Message,
        },
      ],
    })
    res.json(allThreads)
  } catch (error) {
    console.error(error)
  }
})
