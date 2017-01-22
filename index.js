'use strict';
var express = require('express')();
var bodyParser = require('body-parser');
var session = require('express-session');

//const MongoStore = require('connect-mongo')(session);

var _port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000;
var _addr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
express.set('port', _port);
express.set('addr', _addr);

express.use('/app', express.static(__dirname + '/client/dist'));
express.use(bodyParser.urlencoded({ extended: false }));
express.use(bodyParser.json());
express.use(session({
  name:'project7',
  secret: 'project7adminsecret',
  resave: true,
  saveUninitialized: true
}));


express.use('/', function(req, res, next) {
	res.setHeader('charset', 'utf-8');
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

express.use(require('./server'));

express.listen(express.get('port'), express.get('addr'), function () {
  console.log(`Express app listening on ${express.get('addr')}:${express.get('port')}!`);
});
