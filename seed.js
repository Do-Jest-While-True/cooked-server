const db = require('./server/db')
const { Recipe, User, Comment, Follower } = require('./server/db/models')
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
      email: 'Admin',
      password: 123,
    })

    const bryan = await User.create({
      firstName: 'Bryan',
      lastName: 'Ryu',
      username: 'bryu2000',
      email: 'bryanryu1@gmail.com',
      password: 456,
    })

    let users = []
    for (let i = 0; i < 100; i++) {
      const name = faker.name.firstName()
      let newUser = {
        firstName: name,
        lastName: faker.name.lastName(),
        username: faker.internet.userName(),
        email: faker.internet.email(name),
        password: faker.internet.password(),
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

    // MAGIC METHODS ________________________
    console.log('user', Object.keys(admin.__proto__))
    console.log('recipe', Object.keys(recipe.__proto__))
    console.log('comment', Object.keys(comment1.__proto__))
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
