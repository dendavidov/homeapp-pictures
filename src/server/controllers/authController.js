const HTTPStatus = require('http-status');
const passport = require('koa-passport');
const MongoErrors = require('mongo-errors');
const User = require('mongoose').model('User');

exports.signIn = function* signIn() {
  const that = this;
  yield* passport.authenticate('local', function* authenticate(err, user) {
    if (err) {
      throw err;
    }
    if (user === false) {
      that.throw(HTTPStatus.UNAUTHORIZED);
    } else {
      yield that.login(user);
      that.body = { user };
    }
  }).call(this);
};

exports.getCurrentUser = function getCurrentUser() {
  if (this.passport.user) {
    this.body = { user: this.passport.user };
    this.status = HTTPStatus.OK;
  } else {
    this.throw(HTTPStatus.UNAUTHORIZED);
  }
};

exports.createUser = function* createUser() {
  if (!(this.request.body &&
      this.request.body.username &&
      this.request.body.password
  )) {
    this.throw(HTTPStatus.BAD_REQUEST);
  }
  try {
    let user = new User({
      username: this.request.body.username,
      password: this.request.body.password,
    });
    user = yield user.save();
    yield this.login(user);
  } catch (err) {
    if (err.code === MongoErrors.DuplicateKey) {
      this.throw(HTTPStatus.CONFLICT);
      return;
    }
    this.throw(err);
  }

  this.status = HTTPStatus.OK;
  this.body = {
    user: this.passport.user,
  };
};

exports.signOut = function signOut() {
  this.logout();
  this.session = null;
  this.status = HTTPStatus.NO_CONTENT;
};
