const db = require('../db')
const Recipe = require('./recipe')
const User = require('./user')
const Comment = require('./comment')
const Follower = require('./follower')
const Like = require('./like')
const Thread = require('./thread')
const Message = require('./messages')

// Model Associations

// User-Recipe 1:M
User.hasMany(Recipe)
Recipe.belongsTo(User)

// Recipe-Comment 1:M
Recipe.hasMany(Comment)
Comment.belongsTo(Recipe)

// User-Comment 1:M
User.hasMany(Comment)
Comment.belongsTo(User)

// User-User (through following) M:M
User.belongsToMany(User, {
  as: 'following',
  foreignKey: 'followingId',
  through: Follower,
})
User.belongsToMany(User, {
  as: 'user',
  foreignKey: 'followedById',
  through: Follower,
})

// User-Recipe -- Defining like through table
Recipe.belongsToMany(User, {
  foreignKey: 'recipeId',
  through: Like,
})

Recipe.hasMany(Like)
Like.belongsTo(Recipe)

User.belongsToMany(Recipe, {
  foreignKey: 'userId',
  through: Like,
})

// Thread-Message 1:M
Thread.hasMany(Message)
Message.belongsTo(Thread)

module.exports = {
  Recipe,
  User,
  Comment,
  Follower,
  Like,
  Thread,
  Message,
}
