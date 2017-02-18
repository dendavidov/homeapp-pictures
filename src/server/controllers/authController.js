const passport = require('koa-passport');
const User = require('mongoose').model('User');

const Utils = require('../utils');

exports.signIn = function* signIn() {
  const that = this;
  yield* passport.authenticate('local', function* authenticate(err, user) {
    if (err) {
      throw err;
    }
    if (user === false) {
      that.status = Utils.http('UNAUTHORIZED').status;
      that.body = {
        error: Utils.http('UNAUTHORIZED').message,
      };
    } else {
      yield that.login(user);
      that.body = { user };
    }
  }).call(this);
};

exports.getCurrentUser = function getCurrentUser() {
  if (this.passport.user) {
    this.body = { user: this.passport.user };
    this.status = 200;
  } else {
    this.status = Utils.http('UNAUTHORIZED').status;
  }
};

exports.createUser = function* createUser() {
  if (!this.request.body) {
    this.throw('The body is empty', 400);
  }
  if (!this.request.body.username) {
    this.throw('Missing username', 400);
  }
  if (!this.request.body.password) {
    this.throw('Missing password', 400);
  }

  try {
    let user = new User({
      username: this.request.body.username,
      password: this.request.body.password,
    });
    user = yield user.save();
    yield this.login(user);
  } catch (err) {
    if (err.code === 11000) {
      this.status = Utils.http('CONFLICT').status;
      this.body = {
        error: 'This username already exists',
      };
      return;
    }
    this.throw(err);
  }

  this.status = 200;
  this.body = {
    user: this.passport.user,
  };
};

exports.signOut = function signOut() {
  this.logout();
  this.session = null;
  this.status = 200;
  this.body = {
    message: 'User successfully signed out',
  };
};
