const LocalStrategy = require('passport-local').Strategy;
const authenticator = require('../lib/authenticator');
const User = require('mongoose').model('User');

const serialize = (user, done) => {
  done(null, user._id);
};

const deserialize = (id, done) => {
  User.findById(id, done);
};

module.exports = (passport, config) => {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new LocalStrategy(authenticator.localUser));
};

