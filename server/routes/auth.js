'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var handleResult = require('../helpers/handle-result');
var errors = require('../helpers/connection-error');

router.post('/register', function (req, res) {
	var user = new User();
	console.log("register route:", req.body);
  user.name = req.body.name;
  user.email = req.body.email;
	user.admin = false;
  user.setPassword(req.body.password);
  user.save(function (err) {
    var token;
    token = user.generateJwt();
		handleResult(res,null,{
      "token" : token
    });
  });
});

router.post('/login', function (req, res) {
	console.log("login route:", req.body);
  passport.authenticate('local', function (err, user, info) {
    var token;
    // If Passport throws/catches an error
    if (err) {
			handleResult(res, new errors.notFoundError(err.message));
      return;
    }
    // If a user is found
    if(user){
      token = user.generateJwt();
			handleResult(res,null,{
	      "token" : token
	    });
    } else {
      // If user is not found
			handleResult(res, new errors.authError(info));
    }
  })(req, res);
});

router.post('/logout', function(req, res){
	console.log("logout action");
  req.logOut();
	if (req.session) req.session.destroy();
	handleResult(res,null,{
		"OK" : true
	});
});

module.exports = router;
