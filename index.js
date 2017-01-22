'use strict';
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

//const MongoStore = require('connect-mongo')(session);

var _port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 5000;
var _addr = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
app.set('port', _port);
app.set('addr', _addr);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({
  name:'project7',
  secret: 'project7adminsecret',
  resave: true,
  saveUninitialized: true
}));


app.use('/', function(req, res, next) {
	res.setHeader('charset', 'utf-8');
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});
app.use('/', express.static(__dirname + '/client/dist'));

app.use(require('./server'));

app.listen(app.get('port'), app.get('addr'), function () {
  console.log(`Express app listening on ${app.get('addr')}:${app.get('port')}!`);
});
