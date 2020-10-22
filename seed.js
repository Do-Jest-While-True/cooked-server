const db = require('./server/db')
const { Recipe, User, Comment, Message, Thread } = require('./server/db/models')
const stockRecipes = require('./seed-data.js')
const faker = require('faker')

const seed = async () => {
  try {
    await db.sync({ force: true })

    // USERS / FOLLOWERS _____________________
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'Jones',
      username: 'adminjones99',
      email: 'admin@admin.com',
      password: 11111111,
      profileImageUrl:
        'https://shortyawards.imgix.net/entries/11th/d88fd845-6d99-4bf6-a94c-640a5fd7e416.jpeg?auto=format&fit=crop&h=400&q=65&w=400&s=760bad31d7445f0a066c99d22b9c9051',
    })

    const bryan = await User.create({
      firstName: 'Bryan',
      lastName: 'Ryu',
      username: 'bryu2000',
      email: 'bryanryu1@gmail.com',
      password: 456,
      profileImageUrl:
        'https://assets.bonappetit.com/photos/5d7bdb577106210008b62851/5:7/w_800,h_1120,c_limit/Andy-10-Cooking-Rules-portrait.jpg',
    })

    let users = []
    for (let i = 0; i < 100; i++) {
      const name = faker.name.firstName()
      let newUser = {
        firstName: name,
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(name).toLowerCase(),
        password: faker.internet.password(),
        profileImageUrl: faker.image.avatar(),
      }
      users.push(newUser)
    }

    users.forEach(async (user) => {
      await User.create(user)
    })

    // random followings
    for (let i = 1; i < 100; i++) {
      const user1 = await User.findByPk(
        Math.floor(Math.random() * Math.floor(100)) + 1
      )
      const user2 = await User.findByPk(
        Math.floor(Math.random() * Math.floor(100)) + 1
      )
      await user2.setFollowing(user1)
    }

    // make admin have a lot of followers
    // for (let i = 1; i < 100; i++) {
    // 	const user1 = await User.findByPk(Math.floor(Math.random() * Math.floor(100)) + 1);
    // 	await admin.addFollowing(user1);
    // }

    // make admin follow many people
    for (let i = 1; i < 100; i++) {
      const user3 = await User.findByPk(
        Math.floor(Math.random() * Math.floor(100)) + 1
      )
      await user3.addFollowing(admin)
    }

    // RECIPES / COMMENTS ____________________
    await Promise.all([...stockRecipes.map((recipe) => Recipe.create(recipe))])

    const recipe = await Recipe.findByPk(1)

    const comment1 = await Comment.create({
      body: 'First comment',
    })

    let comments = []
    for (let i = 0; i < 50; i++) {
      let newComment = {
        body: faker.lorem.sentence(),
      }
      comments.push(newComment)
    }

    comments.forEach(async (comment) => {
      await Comment.create(comment)
    })

    for (let i = 1; i < 50; i++) {
      const user = await User.findByPk(
        Math.floor(Math.random() * Math.floor(100)) + 1
      )
      const recipeId = await Recipe.findByPk(
        Math.floor(Math.random() * Math.floor(4)) + 1
      )
      const comment = await Comment.findByPk(
        Math.floor(Math.random() * Math.floor(48)) + 1
      )
      await comment.setUser(user)
      await recipeId.addComment(comment)
    }

    await recipe.addComment(comment1)
    await comment1.setUser(admin)

    // MESSAGES / THREADS ______________________

    const thread1 = await Thread.create({
      userA: 1,
      userB: 2,
    })

    const thread2 = await Thread.create({
      userA: 3,
      userB: 1,
    })

    const thread3 = await Thread.create({
      userA: 1,
      userB: 4,
    })
    const message1 = await Message.create({
      body: 'Loved your chicken dish I made it last night!',
      sentBy: 2,
      sentTo: 1,
    })

    const message2 = await Message.create({
      body: 'Those eggs you last last night looked great!',
      sentBy: 3,
      sentTo: 1,
    })

    const message3 = await Message.create({
      body: 'Keep the recipes coming!!!',
      sentBy: 1,
      sentTo: 4,
    })

    const message4 = await Message.create({
      body: 'Thanks I appreciate it!',
      sentBy: 1,
      sentTo: 2,
    })

    const message5 = await Message.create({
      body: 'No problem, talk later.',
      sentBy: 2,
      sentTo: 1,
    })

    await message1.setThread(thread1)
    await message2.setThread(thread2)
    await message3.setThread(thread3)
    await message4.setThread(thread1)
    await message5.setThread(thread1)

    // MAGIC METHODS ________________________
    console.log('user', Object.keys(admin.__proto__))
    console.log('recipe', Object.keys(recipe.__proto__))
    console.log('comment', Object.keys(comment1.__proto__))
    console.log('message', Object.keys(message1.__proto__))
    console.log('thread', Object.keys(thread1.__proto__))
  } catch (err) {
    console.log(err)
  }
}

seed()
  .then(() => {
    console.log('Seeding success!')
    db.close()
  })
  .catch((err) => {
    console.error('Something went wrong!')
    console.error(err)
    db.close()
  })
