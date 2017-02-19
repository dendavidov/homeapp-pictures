const should = require('should');
const HTTPStatus = require('http-status');

const config = require('../../../../src/server/config/config');
const data = require('../../helpers/data');

const apiPrefix = config.app.apiPrefix;
const url = `${apiPrefix}/signup`;

const signUpNewUser = (request) => {
  describe('Sign up new user', () => {
    it('should return 200 and the user information', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(data.CREDENTIALS_NEW)
        .accept('json')
        .expect(HTTPStatus.OK)
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
    it('should return 409', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(data.CREDENTIALS)
        .accept('json')
        .expect(HTTPStatus.CONFLICT)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.error);
          should.equal(res.body.error, HTTPStatus[HTTPStatus.CONFLICT]);
          done();
        });
    });
  });
};

const signUpWithEmptyBody = (request) => {
  describe('Sign up with empty body', () => {
    it('should return 400', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .accept('json')
        .expect(HTTPStatus.BAD_REQUEST)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.error);
          should.equal(res.body.error, HTTPStatus[HTTPStatus.BAD_REQUEST]);
          done();
        });
    });
  });
};

const signUpWithMissingUsername = (request) => {
  describe('Sign up with missing username', () => {
    it('should return 400', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(data.CREDENTIALS_WITH_EMPTY_USERNAME)
        .accept('json')
        .expect(HTTPStatus.BAD_REQUEST)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.error);
          should.equal(res.body.error, HTTPStatus[HTTPStatus.BAD_REQUEST]);
          done();
        });
    });
  });
};

const signUpWithMissingPassword = (request) => {
  describe('Sign up with missing password', () => {
    it('should return 400', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(data.CREDENTIALS_WITH_EMPTY_PASSWORD)
        .accept('json')
        .expect(HTTPStatus.BAD_REQUEST)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.error);
          should.equal(res.body.error, HTTPStatus[HTTPStatus.BAD_REQUEST]);
          done();
        });
    });
  });
};

module.exports = {
  signUpNewUser,
  signUpExistedUser,
  signUpWithEmptyBody,
  signUpWithMissingUsername,
  signUpWithMissingPassword,
};
