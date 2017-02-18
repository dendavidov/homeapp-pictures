const assert = require('assert');

const Utils = require('../../../src/server/utils');

describe('Utils.http', () => {
  it('should work when UNAUTHORIZED is passed', () => {
    assert.equal(Utils.http('UNAUTHORIZED').status, 401);
    assert.equal(Utils.http('UNAUTHORIZED').message, 'Unauthorized');
  });

  it('should work when CONFLICT is passed', () => {
    assert.equal(Utils.http('CONFLICT').status, 409);
    assert.equal(Utils.http('CONFLICT').message, 'Conflict');
  });

  it('should return undefined when nothing is passed', () => {
    assert.equal(Utils.http().status, undefined);
    assert.equal(Utils.http().message, undefined);
  });

  it('should return undefined when unknown identifier is passed', () => {
    assert.equal(Utils.http('UNKNOWN_IDENTIFIER').status, undefined);
    assert.equal(Utils.http('UNKNOWN_IDENTIFIER').message, undefined);
  });
});
