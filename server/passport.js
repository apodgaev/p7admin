'use strict';
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');

passport.use(new LocalStrategy({
    usernameField: 'email'
  },
  function(username, password, done) {
    User.findOne({ email: username }, function (err, user) {
      if (err) { return done(err); }
      // Return if user not found or password is wrong
      if (!user || !user.validPassword(password)) {
        return done(null, false, {
          message: 'Authentication failed'
        });
      }
      // If credentials are correct, return the user object
      return done(null, user);
    });
  }
));
