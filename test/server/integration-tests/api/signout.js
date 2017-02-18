const should = require('should');

const config = require('../../../../src/server/config/config');

const apiPrefix = config.app.apiPrefix;
const url = `${apiPrefix}/signout`;

const signOut = (request) => {
  describe('Sign out', () => {
    it('should return the message "User successfully signed out"', (done) => {
      request.post(url)
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
};

module.exports = {
  signOut,
};
