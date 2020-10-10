const express = require('express');
const app = express();
// const morgan = require('morgan');

// app.use(morgan('dev')); //logging middleware

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/api', require('./api'));

// handle 404s -- need to inset a Not Found Page
app.use((req, res, next) => {
	res.status(404).send(/* Not Found Page */);
});

// handle any errors
app.use((err, req, res, next) => {
	console.error(err);
	res.status(err.status || 500).send(err.message);
});

module.exports = app;
