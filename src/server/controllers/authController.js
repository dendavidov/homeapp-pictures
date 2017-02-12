const passport = require('koa-passport');
const User = require('mongoose').model('User');

exports.signIn = function* () {
  const _this = this;
  yield* passport.authenticate('local', function* (err, user) {
    if (err) {
      throw err;
    }
    if (user === false) {
      _this.status = 401;
    } else {
      yield _this.login(user);
      _this.body = { user };
    }
  }).call(this);
};

exports.getCurrentUser = function* () {
  if (this.passport.user) {
    this.body = { user: this.passport.user };
  }
  this.status = 200;
};

exports.createUser = function* () {
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
    this.throw(err);
  }

  this.status = 200;
  this.body = {
    user: this.passport.user,
  };
};

exports.signOut = function* () {
  this.logout();
  this.session = null;
  this.status = 204;
};
