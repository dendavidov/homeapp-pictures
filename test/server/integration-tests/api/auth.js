const HTTPStatus = require('http-status');
const should = require('should');

const data = require('./../../helpers/data');
const config = require('../../../../src/server/config/config');


const apiPrefix = config.app.apiPrefix;
const url = `${apiPrefix}/auth`;

const anonymousCall = (request) => {
  describe('Anonymous Call', () => {
    it('should return 401', (done) => {
      request.get(url)
        .accept('json')
        .expect(HTTPStatus.UNAUTHORIZED)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.error);
          should.equal(res.body.error, HTTPStatus[HTTPStatus.UNAUTHORIZED]);
          should.not.exist(res.body.user);
          done();
        });
    });
  });
};

const authenticatedCall = (request, username) => {
  describe('Check authentication for logged in user', () => {
    it('should return 200 and the user information', (done) => {
      request.get(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .expect(HTTPStatus.OK)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.user);
          should.exists(res.body.user.username);
          should.equal(res.body.user.username, username);
          done();
        });
    });
  });
};

const signInWithWrongPassword = (request) => {
  describe('Sign in with wrong password', () => {
    it('should return 401', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(data.CREDENTIALS_WRONG)
        .expect(HTTPStatus.UNAUTHORIZED)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.error);
          should.equal(res.body.error, HTTPStatus[HTTPStatus.UNAUTHORIZED]);
          should.not.exist(res.body.user);
          done();
        });
    });
  });
};

const signInWithNotExistedUser = (request) => {
  describe('Sign in with username which doesn\'t exist', () => {
    it('should return 401', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(data.CREDENTIALS_NEW)
        .expect(HTTPStatus.UNAUTHORIZED)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.error);
          should.equal(res.body.error, HTTPStatus[HTTPStatus.UNAUTHORIZED]);
          should.not.exist(res.body.user);
          done();
        });
    });
  });
};

const signIn = (request, credentials) => {
  describe('Sign in', () => {
    it('should return 200 and the user\'s information', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(credentials)
        .expect(HTTPStatus.OK)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.user);
          should.exists(res.body.user.username);
          should.equal(res.body.user.username, credentials.username);
          done();
        });
    });
  });
};

module.exports = {
  anonymousCall,
  authenticatedCall,
  signInWithWrongPassword,
  signInWithNotExistedUser,
  signIn,
};
