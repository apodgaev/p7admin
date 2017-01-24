'use strict';
var express = require('express');
var router = express.Router();
var db = require('./db');

router.use('/stars', require('./stars'));
//router.use('/users', require('./users'))

// entry point - setting connection string for the database
router.post('/config', function(req, res) {
	let dbUri = req.body.dbUri;
	let session = req.session;
	// TODO: refactor this to optimised performance
	db.connect(req.session.id, dbUri, function() {
		session.dbUri = dbUri;
		if(!res.headersSent) res.json({error:0,data:"OK"});
	}, function(err) {
		if(!res.headersSent) {
			console.log("connection error");
			res.status(401).json({error:err});
		}
		if(session.dbUri) delete session.dbUri;
	});
});

module.exports = router;
