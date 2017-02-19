const app = require('../../../src/server/server');
const request = require('supertest').agent(app.listen());

const data = require('./../helpers/data');
const dbHelper = require('./../helpers/database');
const auth = require('./api/auth');
const signout = require('./api/signout');

describe('Auth', () => {
  before(dbHelper.createDatabase());

  auth.anonymousCall(request);

  auth.signInWithWrongPassword(request);

  auth.signInWithNotExistedUser(request);

  auth.signIn(request, data.CREDENTIALS);

  auth.authenticatedCall(request, data.CREDENTIALS.username);

  signout.signOut(request);

  after((done) => {
    dbHelper.dropDatabase(done);
  });
});
