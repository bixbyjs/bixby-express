/* global describe, it, expect */

var factory = require('../../app/middleware/csrfprotection');


describe('middleware/csrfprotection', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/middleware/csrfProtection');
    expect(factory['@singleton']).to.equal(undefined);
  });
  
});
