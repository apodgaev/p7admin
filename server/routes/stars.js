'use strict';
var express = require('express');
var router = express.Router();
var db = require('../db');
var Star = require('../models/star');
var handleResult = require('../helpers/handle-result');
var errors = require('../helpers/connection-error');

router.use(function (err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
		handleResult(res, new errors.authError(err.name + ": " + err.message));
  }
});

/*
 * /stars route
 *  GET: finds all stars
 *  POST: creates a new star
 */
router.get('/', function(req, res) {
	console.log("stars get request with id", req.payload);
	if (!req.payload._id) {
		handleResult(res, new errors.authError());
  } else {
    // Otherwise continue
		Star.find(function(err, stars) {
			handleResult(res, err, stars)
		});
  }
});

router.post('/', function(req, res) {
	console.log("stars post request with id", req.payload._id);
	if (!req.payload._id) {
		handleResult(res, new errors.authError());
  } else {
    // Otherwise continue
		var starData = req.body;
		var star = new Star(starData);
		star.save(function(err, star) {
			handleResult(res, err, star);
		});

  }
});
module.exports = router;
