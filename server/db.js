'use strict';
var mongoose = require('mongoose');
var config = require('./config');

mongoose.connect(config.mongo_uri);
let _c = mongoose.connection;

// CONNECTION EVENTS
// When successfully connected
_c.on('connected', () => {
  console.log('Mongoose connection open');
});

// If the connection throws an error
_c.on('error', (error) => {
  console.log('Mongoose connection error: ' + error);
	process.exit(1);
});

// When the connection is disconnected
_c.on('disconnected', () => {
  console.log('Mongoose connection disconnected');
	process.exit(1);
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
	_c.close(() => {
		console.log('Mongoose connection disconnected through app termination');
		process.exit(0);
	});
});

module.exports = {
	db: mongoose,
	connection: _c
};
