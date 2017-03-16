'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var cObject = require('./celestial-object');

var options = {discriminatorKey: 'objectType', _id: true};

var PlanetSchema = new mongoose.Schema({
	planetType: { type: Schema.Types.ObjectId, ref: 'PlanetType' },
	satellites: [
		{
			objectType: String,
			object: { type: Schema.Types.ObjectId, refPath: 'satellites.objectType' }
		}
	]
}, options);

var Planet = cObject.discriminator('Planet', PlanetSchema);

module.exports = Planet;
