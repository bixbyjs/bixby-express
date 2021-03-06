/* global describe, it, expect */

var factory = require('../../app/middleware/parse');


describe('middleware/parse', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/middleware/parse');
    expect(factory['@singleton']).to.equal(undefined);
  });
  
});
