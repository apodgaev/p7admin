'use strict';
const lodash = require('lodash');
var express = require('express');
var router = express.Router();
var db = require('../db');
var Star = require('../models/star');
var Planet = require('../models/planet');
var PlanetType = require('../models/planet-type');
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
	Star.find().populate('orbits.object').exec(function(err, stars) {
		handleResult(res, err, stars)
	});
});

router.post('/', function(req, res) {
	console.log("stars post request");
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
	return Star.findById(id)
		.populate({
	    path: 'orbits.object',
	    // populate satellites of populated celestial objects too
	    populate: { path: 'satellites.object' }
	  })
		.exec(function (err, star) {
			if (err) {
	      handleResult(res, err, star);
	    } else if (!star) {
				handleResult(res, {status:404, message:`Star ${id} not found.`}, null);
	    } else {
				console.log("star found", star);
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
	console.log("starData", starData);
	var star = lodash.assign(req.star, starData);
	// TODO: update orbits
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

function updateStarAndPlanet(star, planetData, res) {
	var planet = new Planet(planetData);
	planet.save(function(err, _planet) {
		console.log("planet", planet);
		console.log("_planet", _planet);
		star.orbits.push({
			objectType: planet.objectType,
			object : planet
		});
		star.save(function(err, _star) {
			handleResult(res, err, _star);
		});
	});
}

router.post('/:id/planet', function(req, res) {
	console.log("update star with new planet request", req.params.id);
	var planetData = req.body;
	var star = req.star;
	//console.log("planetData", planetData);
	if(planetData.planetType) {
		PlanetType.findById(planetData.planetType, function (err, pType) {
			if (err) {
	      handleResult(res, err, pType);
	    } else if (!pType) {
				handleResult(res, {status:404, message:`Planet type ${planetData.planetType} not found.`}, null);
	    } else {
				//console.log("PlanetType found:", pType);
				planetData.planetType = pType;
	      updateStarAndPlanet(star, planetData, res);
	    }
		});
	} else {
		updateStarAndPlanet(star, planetData, res);
	}
});

module.exports = router;
