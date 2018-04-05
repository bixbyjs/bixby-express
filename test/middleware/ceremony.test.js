/* global describe, it, expect */

var factory = require('../../app/middleware/ceremony');


describe('middleware/ceremony', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/middleware/ceremony');
    expect(factory['@singleton']).to.equal(undefined);
  });
  
});
