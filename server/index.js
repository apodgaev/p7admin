'use strict';
var express = require('express');
var router = express.Router();
var db = require('./db');
var errors = require('./helpers/connection-error');
var resultHandler = require('./helpers/handle-result');

router.use('/stars', require('./stars'));
//router.use('/users', require('./users'))

// entry point - setting connection string for the database
router.post('/config', function(req, res) {
	console.log("config save", req.session.id);
	let dbUri = req.body.dbUri;
	// TODO: refactor this to optimised performance
	db.connect(req.session.id, dbUri, function() {
		req.session.dbUri = dbUri;
		req.session.userId = req.session.id;
		if(!res.headersSent) resultHandler(res, null, "OK");
	}, function(err) {
		if(!res.headersSent) {
			console.log("connection error");
			var cErr = new errors.connectionError(err);
			resultHandler(res, cErr);
		}
		if(req.session.dbUri) delete req.session.dbUri;
	});
});

module.exports = router;
