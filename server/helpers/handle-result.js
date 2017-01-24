'use strict';

var Response = require('./response');

module.exports = function handleResult(response, error, data) {
	let result;
	if(!!error) {
		// basic error handling
		if(!!error.status) response.status(error.status);
		result = new Response((!!error.status) ? error.status : 500, null, (!!error.message) ? error.message : error);
	} else {
		// response without errors
		result = new Response(0, data, "");
	}
	response.json(result);
};
