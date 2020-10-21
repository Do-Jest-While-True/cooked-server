const router = require('express').Router()
const { Message, Thread, User } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

// GET ALL /api/directMessages/threads
// This is all threads for ME. to display on all users messages page
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
    const allUserIdFromMyThreads = await allThreads.map((thread) => {
      if (thread.userA === req.user.id) {
        return thread.userB
      } else {
        return thread.userA
      }
    })
    const allUsersFromMyThreads = await User.findAll({
      where: {
        id: {
          [Op.in]: allUserIdFromMyThreads,
        },
      },
      attributes: [
        'id',
        'firstName',
        'lastName',
        'username',
        'email',
        'profileImageUrl',
      ],
    })
    const allThreadsWithUserObject = await allThreads.map((thread, i) => {
      thread.dataValues.user = allUsersFromMyThreads[i]
      return thread
    })
    console.log(
      'allThreads With user from get api route ======',
      allThreadsWithUserObject
    )
    res.json(allThreadsWithUserObject)
  } catch (error) {
    console.error(error)
  }
})
