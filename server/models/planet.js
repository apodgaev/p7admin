'use strict';
var mongoose = require('mongoose');
var cObject = require('./celestial-object');
var star = require('./star');

var options = {_id: false};

var PlanetSchema = new mongoose.Schema({
	_planetType: mongoose.Schema.Types.ObjectId,
	satellites: [cObject.schema]
}, options);

var orbits = star.schema.path("orbits");

module.exports = orbits.discriminator('Planet', PlanetSchema);
