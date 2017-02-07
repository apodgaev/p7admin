'use strict';
var express = require('express');
var router = express.Router();

var config = require('../config');
var errors = require('../helpers/connection-error');
var handleResult = require('../helpers/handle-result');

var jwt = require('express-jwt');
var auth = jwt({
  secret: config.secret,
  userProperty: 'payload'
});

var isAdmin = function isAdmin(req, res, next) {
	if (req.payload && req.payload.admin) {
		next();
	} else {
		handleResult(res, new errors.authError());
	}
};

var preflight = function preflight(req, res, next) {
	if (req.method == "OPTIONS" && req.ip == "127.0.0.1") {
		console.log("preflight request bypass");
		res.status(200).json({status:"OK"});
	} else {
		next();
	}
};

router.use('/auth', require('./auth'));
router.use('/stars', preflight, auth, isAdmin, require('./stars'));

module.exports = router;
