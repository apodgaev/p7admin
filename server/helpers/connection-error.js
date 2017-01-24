'use strict';

module.exports = function connectionError() {
	this.status = 401;
	this.message = "Database connection not found!";
};
