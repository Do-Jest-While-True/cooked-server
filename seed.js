const { green, red } = require('chalk')
const db = require('./server/db')
const { Recipe, User, Comment, Follower } = require('./server/db/models')
const stockRecipes = require('./seed-data.js')
const faker = require('faker')

const seed = async () => {
  try {
    await db.sync({ force: true })

    // USERS / FOLLOWERS _____________________
    const user1 = await User.create({
      firstName: 'Xander',
      lastName: 'Bakx',
      email: 'xanderbakx@gmail.com',
      password: 123,
    })

    const user2 = await User.create({
      firstName: 'Bryan',
      lastName: 'Ryu',
      email: 'bryanryu1@gmail.com',
      password: 456,
    })

    let users = []
    for (let i = 0; i < 100; i++) {
      const name = faker.name.firstName()
      let newUser = {
        firstName: name,
        lastName: faker.name.lastName(),
        email: faker.internet.email(name),
        password: faker.internet.password(),
      }
      users.push(newUser)
    }

    users.forEach(async (user) => {
      await User.create(user)
    })

    for (let i = 1; i < 100; i++) {
      const user = await User.findByPk(
        Math.floor(Math.random() * Math.floor(100)) + 1
      )
      const user2 = await User.findByPk(
        Math.floor(Math.random() * Math.floor(100)) + 1
      )
      await user.setFollower(user2)
    }

    await user1.setFollower(user2)
    await user2.setFollower(user1)

    // RECIPES / COMMENTS ____________________
    await Promise.all([...stockRecipes.map((recipe) => Recipe.create(recipe))])

    const recipe = await Recipe.findByPk(1)

    const comment1 = await Comment.create({
      body: 'First comment',
    })

    let comments = []
    for (let i = 0; i < 50; i++) {
      let comment = {
        body: faker.lorem.sentence(),
      }
      comments.push(comment)
    }

    comments.forEach(async (comment) => {
      await Comment.create(comment)
    })

    for (let i = 1; i < 50; ) await recipe.addComment(comment)
    await comment1.setUser(user2)

    // MAGIC METHODS ________________________
    console.log('user', Object.keys(user1.__proto__))
    console.log('recipe', Object.keys(recipe.__proto__))
    console.log('comment', Object.keys(comment.__proto__))
  } catch (err) {
    console.log(red(err))
  }
}

seed()
  .then(() => {
    console.log(green('Seeding success!'))
    db.close()
  })
  .catch((err) => {
    console.error(red('Something went wrong!'))
    console.error(red(err))
    db.close()
  })
