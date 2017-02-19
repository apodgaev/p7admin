'use strict';
var mongoose = require('mongoose');
var cObject = require('./celestial-object');

var options = {discriminatorKey: 'objectType'};

var PlanetSchema = new mongoose.Schema({
	planetType: mongoose.Types.ObjectId
	satellites: [cObject.schema],
}, options);

module.exports = cObject.discriminator('Planet', PlanetSchema);
