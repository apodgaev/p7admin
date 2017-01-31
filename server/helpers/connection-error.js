'use strict';

module.exports = function connectionError(err) {
	this.status = 417;
	this.message = "Database connection not found!";
	if(err) {
		this.error = err;
	}
};
module.exports = function authError() {
	this.status = 401;
	this.message = "Authorisation required!";
};
