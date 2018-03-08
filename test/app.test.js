/* global describe, it, expect */

var factory = require('../app/app');


describe('app', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/Main');
    expect(factory['@singleton']).to.equal(true);
  });
  
});
