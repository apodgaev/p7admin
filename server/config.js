'use strict';
module.exports = {
	env: process.env.NODE_ENV || 'development',
	mongo_uri: process.env.MONGOLAB_URI || process.env.MONGODB_URI || 'mongodb://localhost/test',
	addr: process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
	port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000,
	secret: process.env.COOKIE_SECRET || 'project7_admin_secret',
};
