'use strict';

module.exports.connectionError = function connectionError(err) {
	this.status = 417;
	this.message = "Database connection not found!";
	if(err) {
		this.error = err;
	}
};
module.exports.authError = function authError() {
	this.status = 401;
	this.message = "Authorisation required!";
};
