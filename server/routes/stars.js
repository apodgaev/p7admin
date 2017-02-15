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
	console.log("stars get request");
  // Otherwise continue
	Star.find(function(err, stars) {
		handleResult(res, err, stars)
	});
});

router.post('/', function(req, res) {
	console.log("stars post request");
  // Otherwise continue
	var starData = req.body;
	console.log("star", starData);
	var star = new Star(starData);
	star.save(function(err, star) {
		console.log("result", err, star);
		handleResult(res, err, star);
	});
});

/*
 * /stars/:id route
 *  GET: get details about a star
 *  PUT: update information about a star
 *  DELETE: delete star
 */
router.param('id', function(req, res, next, id) {
	return Star.findById(id, function (err, star) {
		if (err) {
      handleResult(res, err, star);
    } else if (!star) {
			handleResult(res, {status:404, message:`Star ${id} not found.`}, null);
    } else {
			req.star = star;
      next();
    }
	});
});

router.get('/:id', function(req, res) {
	console.log("get star request", req.params.id);
	handleResult(res, null, req.star);
});

router.put('/:id', function(req, res) {
	console.log("update star request", req.params.id);
  // Otherwise continue
	var starData = req.body;
	var star = req.star;
	for (let p in starData) {
		if(starData.hasOwnProperty(p)) {
			star[p] = starData[p];
		}
	}
	// TODO: update properties
	star.save(function(err, star) {
		handleResult(res, err, star);
	});
});

router.delete('/:id', function(req, res) {
	let star = req.star;
	star.remove(function(err) {
		handleResult(res, err, {});
	});
});

module.exports = router;
