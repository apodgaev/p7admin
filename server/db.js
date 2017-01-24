'use strict';
var mongoose = require('mongoose');

// connections pool
var connections = {};

module.exports.connect = function connect(userId, dbURI, success, error) {

	if(connections[userId]) connections[userId].close();

	var _c = mongoose.createConnection(dbURI);

	// CONNECTION EVENTS
	// When successfully connected
	_c.on('connected', function () {
	  console.log('Mongoose connection open to ' + dbURI + ' for userId ' + userId);
		if(success) success();
	});

	// If the connection throws an error
	_c.on('error', function (err) {
	  console.log('Mongoose connection error: ' + err);
		if(error) error(err);
	});

	// When the connection is disconnected
	_c.on('disconnected', function () {
	  console.log('Mongoose connection disconnected');
		if(error) error();
	});

	connections[userId] = _c;
}

module.exports.get = function get(userId) {
	return connections[userId];
}


// If the Node process ends, close the Mongoose connection
process.on('SIGINT', () => {
	for (let userId in connections) {
		let conn = connections[userId];
		if(conn) {
			conn.close(function () {
				console.log('Mongoose connection disconnected through app termination');
				delete connections[userId];
			});
		}
	}
});
