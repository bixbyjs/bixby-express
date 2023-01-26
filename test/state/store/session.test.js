/* global describe, it, expect */

var factory = require('../../../app/state/store/session');


describe('state/store/session', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('module:flowstate.Store');
  });
  
});
