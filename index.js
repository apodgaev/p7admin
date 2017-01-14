'use strict';
var express = require('express')();
var bodyParser = require('body-parser');

express.use(bodyParser.urlencoded({ extended: false }));
express.use(bodyParser.json());
express.use(function(req, res, next) {
	res.setHeader('charset', 'utf-8');
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

//TODO: init db and express app
