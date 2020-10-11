const { green, red } = require('chalk')
const db = require('./server/db')
const { Recipe, User, Comment, Follower } = require('./server/db/models')
const stockRecipes = require('./seed-data.js')

const seed = async () => {
  try {
    await db.sync({ force: true })
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

    const comment = await Comment.create({
      body: 'First comment',
    })

    await user1.setFollower(user2)

    // Magic methods for user instance
    console.log('user', Object.keys(user1.__proto__))

    await Promise.all([...stockRecipes.map((recipe) => Recipe.create(recipe))])
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
