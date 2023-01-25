/* global describe, it, expect */

var factory = require('../../app/auth/authenticator');
var expect = require('chai').expect;


describe('auth/authenticator', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('module:bixby-express.Authenticator');
    expect(factory['@singleton']).to.equal(true);
  });
  
});
