const LocalStrategy = require('passport-local').Strategy;
const authenticator = require('../lib/authenticator');
const User = require('mongoose').model('User');

const serialize = (user, done) => {
  /* eslint-disable no-underscore-dangle */
  done(null, user._id);
  /* eslint-enable no-underscore-dangle */
};

const deserialize = (id, done) => {
  User.findById(id, done);
};

module.exports = (passport) => {
  passport.serializeUser(serialize);
  passport.deserializeUser(deserialize);
  passport.use(new LocalStrategy(authenticator.localUser));
};
