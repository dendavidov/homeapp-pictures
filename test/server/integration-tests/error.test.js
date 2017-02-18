const app = require('../../../src/server/server');
const request = require('supertest').agent(app.listen());

describe('Errors', () => {
  it('should return 404', (done) => {
    request.get('/urlThatDoesNotExist')
      .accept('json')
      .expect(404)
      .end(done);
  });
});
