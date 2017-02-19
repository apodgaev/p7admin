'use strict';
var express = require('express');
var router = express.Router();

router.use('/planet-type', require('./planet-type'));

module.exports = router;
