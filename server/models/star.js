'use strict';
var mongoose = require('mongoose');
var dberror = require('./dberror');

module.exports = function Star(db) {
	var StarSchema = new mongoose.Schema({
		name      : { type: String, unique: true, required: true }
	});
	StarSchema.post('save', dberror);
	StarSchema.post('update', dberror);
	StarSchema.post('findOneAndUpdate', dberror);
	StarSchema.post('insertMany', dberror);

	return db.model('Star', StarSchema);
}
