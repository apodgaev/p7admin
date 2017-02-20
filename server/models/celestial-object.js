'use strict';
var mongoose = require('mongoose');
var dberror = require('./dberror');

var options = {discriminatorKey: 'objectType'};

var CelestialObjectSchema = new mongoose.Schema({
	name : { type: String, unique: true, required: true },
	description : { type: String },
	position : {
		radius : Number,
		angle : Number
	}
}, options);

CelestialObjectSchema.post('save', dberror);
CelestialObjectSchema.post('update', dberror);
CelestialObjectSchema.post('findOneAndUpdate', dberror);
CelestialObjectSchema.post('insertMany', dberror);

module.exports = mongoose.model('CelestialObject', CelestialObjectSchema);
