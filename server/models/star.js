'use strict';
var mongoose = require('mongoose');
var dberror = require('./dberror');
var cObject = require('./celestial-object');

var StarSchema = new mongoose.Schema({
	name      	: { type: String, unique: true, required: true },
	description : { type: String },
	orbits			: [cObject.schema]
});
StarSchema.post('save', dberror);
StarSchema.post('update', dberror);
StarSchema.post('findOneAndUpdate', dberror);
StarSchema.post('insertMany', dberror);

module.exports = mongoose.model('Star', StarSchema);
