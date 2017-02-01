'use strict';
var express = require('express');
var router = express.Router();
var db = require('./db');
var Star = require('./models/star');
var handleResult = require('./helpers/handle-result');
var errors = require('./helpers/connection-error');

router.use('/', function(req, res, next) {
	console.log("\nauth check:", req.session.id, req.session.userId);
	if(!req.session.userId) {
		var err = new errors.authError();
		//handleResult(res, err);
		next();
	} else {
		next();
	}
});

/*
 * /stars route
 *  GET: finds all stars
 *  POST: creates a new star
 */
router.get('/', function(req, res) {
	console.log("stars get request with id", req.session.id, req.session.userId);
	let conn = db.get(req.session.userId);
	if(conn) {
		console.log("connection found - trying to get data...");
		Star(conn).find(function(err, stars) {
			handleResult(res, err, stars)
		});
	} else {
		handleResult(res, new errors.connectionError());
	}
});

router.post('/', function(req, res) {
	let conn = db.get(req.session.id);
	if(conn) {
		var starData = req.body;
		var StarModel = Star(conn);
		var star = new StarModel(starData);
		star.save(function(err, star) {
			handleResult(res, err, star);
		});
	} else {
		handleResult(res, new ConnectionError());
	}
});
module.exports = router;
