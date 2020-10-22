const router = require('express').Router()
const { Message, Thread, User } = require('../db/models')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
module.exports = router

// GET ALL /api/directMessage/threads
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
    res.json(allThreadsWithUserObject)
  } catch (error) {
    console.error(error)
  }
})

// GET /api/directMessage/singleThread
router.get('/singleThread/:threadId', async (req, res, next) => {
  try {
    const thread = await Message.findAll({
      where: {
        threadId: req.params.threadId,
      },
    })
    res.json(thread)
  } catch (error) {
    next(error)
  }
})

// POST /api/directMessage/newThread
router.post('/newThread', async (req, res, next) => {
  try {
    const { myId, username } = req.body
    const otherUser = await User.findOne({
      where: {
        username,
      },
    })
    const newThread = await Thread.create({
      userA: myId,
      userB: otherUser.id,
    })
    newThread.dataValues.user = otherUser
    newThread.dataValues.messages = []
    res.json(newThread)
  } catch (error) {
    next(error)
  }
})

// POST /api/directMessage/newMessage
router.post('/newMessage', async (req, res, next) => {
  try {
    const { body, sentBy, sentTo, threadId } = req.body
    const newMessage = await Message.create({
      body,
      sentBy,
      sentTo,
      threadId,
    })
    res.json(newMessage)
  } catch (error) {
    next(error)
  }
})
