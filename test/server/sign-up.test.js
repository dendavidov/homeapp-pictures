const should = require('should');
const co = require('co');
const app = require('../../src/server/server');
const request = require('supertest').agent(app.listen());
const databaseHelper = require('./helpers/database');
const authHelper = require('./helpers/authenticator');

const URLS = {
  auth: '/api/v1/auth',
  signUp: '/api/v1/signup',
  signOut: '/api/v1/signout',
};

describe('Sign Up', () => {
  before(co.wrap(function* createUser() {
    yield authHelper.createUser();
  }));

  describe('Sign up new user', () => {
    it('should return the user information', (done) => {
      request.post(URLS.signUp)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(authHelper.CREDENTIALS_NEW)
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
          should.equal(res.body.user.username, authHelper.CREDENTIALS_NEW.username);
          done();
        });
    });
  });

  describe('Check authentication for new user', () => {
    it('should return new user information', (done) => {
      request.get(URLS.auth)
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
          should.equal(res.body.user.username, authHelper.CREDENTIALS_NEW.username);
          done();
        });
    });
  });

  describe('Sign out new user', () => {
    it('should return 200', (done) => {
      request.post(URLS.signOut)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.message);
          should.equal(res.body.message, 'User successfully signed out');
          done();
        });
    });
  });

  describe('Sign in new user', () => {
    it('should return the user information', (done) => {
      request.post(URLS.auth)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(authHelper.CREDENTIALS_NEW)
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
          should.equal(res.body.user.username, authHelper.CREDENTIALS_NEW.username);
          done();
        });
    });
  });

  describe('Sign out', () => {
    it('should return 204 and empty body', (done) => {
      request.post(URLS.signOut)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send()
        .expect(200)
        .end((err, res) => {
          if (err) {
            done(err);
            return;
          }
          should.exists(res.body);
          should.exists(res.body.message);
          should.equal(res.body.message, 'User successfully signed out');
          done();
        });
    });
  });

  describe('Sign up existed user', () => {
    it('should return the user information', (done) => {
      request.post(URLS.signUp)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(authHelper.CREDENTIALS_NEW)
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

  after((done) => {
    databaseHelper.dropDatabase(done);
  });
});
