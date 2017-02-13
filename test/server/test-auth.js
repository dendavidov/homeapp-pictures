const should = require('should');
// const co = require('co');
const app = require('../../src/server/server');
const request = require('supertest').agent(app.listen());
const databaseHelper = require('./helpers/database');
const authHelper = require('./helpers/authenticator');

const URLS = {
  auth: '/api/v1/auth',
  signUp: '/api/v1/signup',
  signOut: '/api/v1/signout',
};

describe('Auth', () => {
  // before(co.wrap(function* createUser() {
  //   yield authHelper.createUser();
  // }));

  describe('Anonymous Call', () => {
    it('should return empty body', (done) => {
      request.get(URLS.auth)
        .accept('json')
        .expect(200)
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

  describe('Sign up', () => {
    it('should return the user information', (done) => {
      request.post(URLS.signUp)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(authHelper.CREDENTIALS)
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
    });
  });

  describe('Sign in', () => {
    it('should return the user information', (done) => {
      request.post(URLS.auth)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send(authHelper.CREDENTIALS)
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
    });
  });

  describe('Sign out', () => {
    it('should return the user information', (done) => {
      request.post(URLS.signOut)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send()
        .expect(204)
        .end((err) => {
          if (err) {
            done(err);
            return;
          }
          done();
        });
    });
  });

  after((done) => {
    databaseHelper.dropDatabase(done);
  });
});
