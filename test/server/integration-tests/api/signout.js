const HTTPStatus = require('http-status');

const config = require('../../../../src/server/config/config');

const apiPrefix = config.app.apiPrefix;
const url = `${apiPrefix}/signout`;

const signOut = (request) => {
  describe('Sign out', () => {
    it('should return 204', (done) => {
      request.post(url)
        .accept('json')
        .set('Content-Type', 'application/json')
        .send()
        .expect(HTTPStatus.NO_CONTENT)
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

module.exports = {
  signOut,
};
