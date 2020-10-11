const { green, red } = require('chalk');
const db = require('./server/db');
const { Recipe, User, Comment, Follower } = require('./server/db/models');
const stockRecipes = require('./seed-data.js');

const seed = async () => {
	try {
		await db.sync({ force: true });

		// USERS / FOLLOWERS _____________________
		const user1 = await User.create({
			firstName: 'Xander',
			lastName: 'Bakx',
			email: 'xanderbakx@gmail.com',
			password: 123
		});

		const user2 = await User.create({
			firstName: 'Bryan',
			lastName: 'Ryu',
			email: 'bryanryu1@gmail.com',
			password: 456
		});

		await user1.setFollower(user2);

		// RECIPES / COMMENTS ____________________
		await Promise.all([ ...stockRecipes.map((recipe) => Recipe.create(recipe)) ]);

		const recipe = await Recipe.findByPk(1);

		const comment = await Comment.create({
			body: 'First comment'
		});

		await recipe.addComment(comment);
		await comment.setUser(user2);

		// MAGIC METHODS ________________________
		console.log('user', Object.keys(user1.__proto__));
		console.log('recipe', Object.keys(recipe.__proto__));
		console.log('comment', Object.keys(comment.__proto__));
	} catch (err) {
		console.log(red(err));
	}
};

seed()
	.then(() => {
		console.log(green('Seeding success!'));
		db.close();
	})
	.catch((err) => {
		console.error(red('Something went wrong!'));
		console.error(red(err));
		db.close();
	});
