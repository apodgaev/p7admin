'use strict';
var mongoose = require('mongoose');
var dberror = require('./dberror');

module.exports = function StarObject(db) {
	var StarObjectSchema = new mongoose.Schema({
		name : { type: String, unique: true, required: true },
	});

	StarObjectSchema.post('save', dberror);
	StarObjectSchema.post('update', dberror);
	StarObjectSchema.post('findOneAndUpdate', dberror);
	StarObjectSchema.post('insertMany', dberror);

	return db.model('StarObject', StarObjectSchema);
}
