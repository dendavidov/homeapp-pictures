const app = require('../../src/server/server');
const request = require('supertest').agent(app.listen());

describe('Index', () => {
  it('should render index page', (done) => {
    request.get('/api/v1')
      .expect(200)
      .end(done);
  });
});
