'use strict';
var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');
var handleResult = require('../helpers/handle-result');

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
			"user" : user,
      "token" : token
    })
  });
});


router.post('/login', function (req, res) {
	console.log("login route:", req.body);
  passport.authenticate('local', function (err, user, info) {
    var token;

    // If Passport throws/catches an error
    if (err) {
      res.status(404).json(err);
      return;
    }

    // If a user is found
    if(user){
      token = user.generateJwt();
      res.status(200);
      res.json({
        "token" : token
      });
    } else {
      // If user is not found
      res.status(401).json(info);
    }
  })(req, res);
});

module.exports = router;
