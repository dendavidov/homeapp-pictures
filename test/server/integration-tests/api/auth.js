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
        .expect(401)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.not.exist(res.body.user);
          done();
        });
    });
  });
};

const authenticatedCall = (request, username) => {
  describe('Check authentication for logged in user', () => {
    it('should return user information', (done) => {
      request.get(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .expect(200)
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
    it('should return 401 error', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(data.CREDENTIALS_WRONG)
        .expect(401)
        .end((err) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });
  });
};

const signInWithNotExistedUser = (request) => {
  describe('Sign in with username which doesn\'t exist', () => {
    it('should return 401 error', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(data.CREDENTIALS_NEW)
        .expect(401)
        .end((err) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });
  });
};

const signIn = (request, credentials) => {
  describe('Sign in', () => {
    it('should return the user information', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(credentials)
        .expect(200)
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
