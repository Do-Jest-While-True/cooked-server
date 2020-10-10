const { green, red } = require('chalk');
const { db, Recipe } = require('./server/db');
const stockRecipes = require('./seed-data.js');

const seed = async () => {
	try {
		await db.sync({ force: true });

		await Promise.all([ ...stockRecipes.map((recipe) => Recipe.create(recipe)) ]);
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
