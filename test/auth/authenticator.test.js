/* global describe, it, expect */

var expect = require('chai').expect;
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../app/auth/authenticator');
var Authenticator = require('passport').Authenticator;


describe('auth/authenticator', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('module:passport.Authenticator');
    expect(factory['@singleton']).to.equal(true);
  });

  // TODO:
  it.skip('should construct Authenticator', function() {
    var AuthenticatorSpy = sinon.spy(Authenticator);
    var factory = $require('../../app/auth/authenticator', {
      'passport': { Authenticator: AuthenticatorSpy }
    });
    
    var authenticator = factory();
    
    expect(AuthenticatorSpy).to.have.been.calledOnce;
    expect(AuthenticatorSpy).to.have.been.calledWithNew;
    // TODO: Assertions for using scheme and manager
  });
  
});
