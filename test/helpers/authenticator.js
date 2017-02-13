const should = require('should');
const mongoose = require('mongoose');

const User = mongoose.model('User');

exports.CREDENTIALS = { username: 'user', password: 'test-password' };

exports.loginUrl = '/api/v1/auth';

exports.createUser = function* createUser() {
  const user = new User(exports.CREDENTIALS);
  yield user.save();
};

exports.signAgent = function signAgent(agent, done) {
  agent
    .post(exports.loginUrl)
    .set('Content-Type', 'application/json')
    .send(exports.CREDENTIALS)
    .redirects(false)
    .expect(200)
    .end((err, res) => {
      if (err) {
        done(err);
        return;
      }
      should.exists(res.body);
      should.exists(res.body.user);
      should.exists(res.body.user.username);
      done();
    });
};
