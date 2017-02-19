'use strict';
var mongoose = require('mongoose');
var cObject = require('./celestial-object');

var options = {discriminatorKey: 'objectType'};

var AsteroidFieldSchema = new mongoose.Schema({
	richness: Number
}, options);

module.exports = cObject.discriminator('AsteroidField', AsteroidFieldSchema);
