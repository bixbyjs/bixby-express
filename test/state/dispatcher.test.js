/* global describe, it, expect */

var factory = require('../../app/state/dispatcher');


describe('state/dispatcher', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal(undefined);
    expect(factory['@singleton']).to.equal(true);
  });
  
});
