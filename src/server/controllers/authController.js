const passport = require('koa-passport');

exports.signIn = function* () {
  const _this = this;
  yield* passport.authenticate('local', function* (err, user, info) {
    if (err) {
      throw err;
    }
    if (user === false) {
      _this.status = 401;
    } else {
      yield _this.login(user);
      _this.body = { user: user };
    }
  }).call(this);
};

exports.getCurrentUser = function* () {
  if (this.passport.user) {
    this.body = { user: this.passport.user };
  }
  this.status = 200;
};

exports.signOut = function* () {
  this.logout();
  this.session = null;
  this.status = 204;
};
