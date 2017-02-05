'use strict';
var config = require('./config');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');

require('./passport');

app.use('/', function(req, res, next) {
	res.setHeader('charset', 'utf-8');
	console.log('%s %s %s', req.method, req.url, req.path);
	if(config.env == 'development') {
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Access-Control-Allow-Credentials', true);
		res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization");
		res.setHeader('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE");
	}
	next();
});
console.log("static path", __dirname + '../client/dist');
app.use('/', express.static(__dirname + '../client/dist'));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use('/api', require('./routes'));

exports = module.exports = function (db) {
	app.use(session({
		name: 'p7',
		secret: config.secret,
		cookie: { maxAge: 600000 },
		resave: true,
		saveUninitialized: true,
		store: new MongoStore({ mongooseConnection: db.connection })
	}));
	db.connection.on('connected', () => {
		app.listen(config.port, config.addr, function () {
		  console.log(`Express app listening on ${config.addr}:${config.port}...`);
		});
	});
	return app;
}
