'use strict';
var config = require('../config');
var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: config.secret,
  userProperty: 'payload'
});

router.use('/auth', require('./auth'));
router.use('/stars', auth, require('./stars'));

module.exports = router;
