'use strict';
var express = require('express');
var router = express.Router();
var db = require('../../db');
var PlanetType = require('../../models/planet-type');
var handleResult = require('../../helpers/handle-result');
var errors = require('../../helpers/connection-error');

router.get('/', function(req, res) {
	console.log("PlanetType get request");
	PlanetType.find(function(err, list) {
		handleResult(res, err, list)
	});
});

router.post('/', function(req, res) {
	console.log("PlanetType post request");
	var reqData = req.body;
	console.log("PlanetType", reqData);
	var pType = new PlanetType(reqData);
	pType.save(function(err, result) {
		console.log("result", err, result);
		handleResult(res, err, result);
	});
});

router.param('id', function(req, res, next, id) {
	return PlanetType.findById(id, function (err, result) {
		if (err) {
      handleResult(res, err, result);
    } else if (!result) {
			handleResult(res, {status:404, message:`Planet type ${id} not found.`}, null);
    } else {
			req.result = result;
      next();
    }
	});
});

router.put('/:id', function(req, res) {
	console.log("update PlanetType request", req.params.id);
	var reqData = req.body;
	var pType = req.result;
	for (let p in reqData) {
		if(reqData.hasOwnProperty(p)) {
			pType[p] = reqData[p];
		}
	}
	pType.save(function(err, result) {
		handleResult(res, err, result);
	});
});

router.delete('/:id', function(req, res) {
	let pType = req.result;
	pType.remove(function(err) {
		handleResult(res, err, {});
	});
});

module.exports = router;
