'use strict';
var db = require('./server/db');
var app = require('./server/app');

app(db);
