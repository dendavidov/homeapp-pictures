const User = require('mongoose').model('User');
const co = require('co');

exports.localUser = (username, password, done) => {
  co(function* checkPassword() {
    try {
      return yield User.passwordMatches(username, password);
    } catch (e) {
      return null;
    }
  }).then((user) => {
    done(null, user);
  });
};
