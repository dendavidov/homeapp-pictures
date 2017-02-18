const app = require('../../../src/server/server');
const request = require('supertest').agent(app.listen());

const data = require('./../helpers/data');
const dbHelper = require('./../helpers/database');
const auth = require('./api/auth');
const signUp = require('./api/signup');
const signout = require('./api/signout');

describe('Sign Up', () => {
  dbHelper.createDatabase();

  signUp.signUpNewUser(request);

  auth.authenticatedCall(request, data.CREDENTIALS_NEW.username);

  signout.signOut(request);

  auth.signIn(request, data.CREDENTIALS_NEW);

  auth.authenticatedCall(request, data.CREDENTIALS_NEW.username);

  signout.signOut(request);

  signUp.signUpExistedUser(request);

  after((done) => {
    dbHelper.dropDatabase(done);
  });
});
