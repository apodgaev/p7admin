'use strict';
var mongoose = require('mongoose');
var dberror = require('./dberror');
var Schema = mongoose.Schema;

var StarSchema = new Schema({
	name      	: { type: String, unique: true, required: true },
	description : { type: String },
	orbits			: [
		{
			objectType: String,
			object: { type: Schema.Types.ObjectId, refPath: 'orbits.objectType' }
		}
	]
});
StarSchema.post('save', dberror);
StarSchema.post('update', dberror);

module.exports = mongoose.model('Star', StarSchema);
