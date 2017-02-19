'use strict';
var mongoose = require('mongoose');
var dberror = require('./dberror');

var PlanetTypeSchema = new mongoose.Schema({
	name : { type: String, unique: true, required: true },
	description : String,
	imageUrl : String
});
PlanetTypeSchema.post('save', dberror);
PlanetTypeSchema.post('update', dberror);
PlanetTypeSchema.post('findOneAndUpdate', dberror);
PlanetTypeSchema.post('insertMany', dberror);

module.exports = mongoose.model('PlanetType', PlanetTypeSchema);
