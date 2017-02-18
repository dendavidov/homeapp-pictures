const should = require('should');
const data = require('../../helpers/data');

const config = require('../../../../src/server/config/config');

const apiPrefix = config.app.apiPrefix;
const url = `${apiPrefix}/signup`;

const signUpNewUser = (request) => {
  describe('Sign up new user', () => {
    it('should return the user information', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(data.CREDENTIALS_NEW)
        .accept('json')
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.user);
          should.exists(res.body.user.username);
          should.equal(res.body.user.username, data.CREDENTIALS_NEW.username);
          done();
        });
    });
  });
};

const signUpExistedUser = (request) => {
  describe('Sign up existed user', () => {
    it('should return message "This username already exists"', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(data.CREDENTIALS)
        .accept('json')
        .expect(409)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.error);
          should.equal(res.body.error, 'This username already exists');
          done();
        });
    });
  });
};

module.exports = {
  signUpNewUser,
  signUpExistedUser,
};
