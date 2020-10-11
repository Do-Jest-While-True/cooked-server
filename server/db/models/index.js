const db = require('../db')
const Recipe = require('./recipe')
const User = require('./user')
const Comment = require('./comment')
const Follower = require('./follower')

// Model Associations

// User-Recipe 1:M
User.hasMany(Recipe)
Recipe.belongsTo(User)

// Recipe-Comment 1:M
Recipe.hasMany(Comment)
Comment.belongsTo(Recipe)

// User-User (as Follower) M:M
User.belongsToMany(User, {
  as: 'follower',
  foreignKey: 'followerId',
  through: 'Follower',
})
User.belongsToMany(User, {
  as: 'user',
  foreignKey: 'userId',
  through: 'Follower',
})

module.exports = {
  db,
  Recipe,
  User,
  Comment,
  Follower,
}
