const db = require('../db');
const Recipe = require('./recipe');
const User = require('./user');
const Comment = require('./comment');

// Model Associations

// User-Recipe 1:M
User.hasMany(Recipe);
Recipe.belongsTo(User);

// Recipe-Comment 1:M
Recipe.hasMany(Comment);
Comment.belongsTo(Recipe);

// User-Comment 1:M
User.hasMany(Comment);
Comment.belongsTo(User);

// User-User (through following) M:M
User.belongsToMany(User, {
	as: 'follower',
	foreignKey: 'followerId',
	through: 'followings'
});
User.belongsToMany(User, {
	as: 'user',
	foreignKey: 'userId',
	through: 'followings'
});

module.exports = {
	Recipe,
	User,
	Comment
};
