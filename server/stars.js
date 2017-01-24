'use strict';
var express = require('express');
var router = express.Router();
var db = require('./db');
var Star = require('./models/star');
var handleResult = require('./helpers/handle-result');
var ConnectionError = require('./helpers/connection-error');

/*
 * /stars route
 *  GET: finds all stars
 *  POST: creates a new star
 */
router.get('/', function(req, res) {
	let conn = db.get(req.session.id);
	if(conn) {
		Star(conn).find(function(err, stars) {
			handleResult(res, err, stars)
		});
	} else {
		handleResult(res, new ConnectionError());
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
