'use strict';

var Response = require('./response');

module.exports = function handleResult(response, error, data) {
	let result;
	if(!!error) {
		// basic error handling
		var status = (!!error.status) ? error.status : 500;
		response.status(status);
		result = new Response((!!error.error) ? error.error : error.status, null, (!!error.message) ? error.message : error);
	} else {
		// response without errors
		result = new Response(0, data, "");
	}
	response.json(result);
};
