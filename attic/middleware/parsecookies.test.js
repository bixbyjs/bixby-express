/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/middleware/parsecookies');


describe('middleware/parsecookies', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/middleware/parseCookies');
    expect(factory['@singleton']).to.equal(true);
  });
  
  it('should resolve with setup function', function(done) {
    var _keyring = { get: function(){} };
    sinon.stub(_keyring, 'get').yieldsAsync(null, 'keyboard cat');
    
    var promise = factory(_keyring);
    expect(_keyring.get).to.have.been.calledOnce;
    
    promise.then(function(setup) {
      expect(setup).to.be.a('function');
      done();
    }).catch(done);
  }); // should resolve with middleware
  
  describe('setup', function() {
    var _keyring = { get: function(){} };
    sinon.stub(_keyring, 'get').yieldsAsync(null, 'keyboard cat');
    
    var cookieParserStub = sinon.stub().returns(function(req, res, next){});
    var promise = $require('../../app/middleware/parsecookies',
      { 'cookie-parser': cookieParserStub }
    )(_keyring);
    var setup;
    
    before(function(done) {
      promise.then(function(s) {
        setup = s;
        done();
      });
    });
    
    it('should create middleware with default options', function() {
      var middleware = setup();
      
      expect(cookieParserStub).to.have.been.calledOnceWithExactly('keyboard cat');
      expect(middleware).to.be.a('function');
      expect(middleware.length).to.equal(3);
    }); // should create middleware with default options
    
  }); // setup
  
}); // middleware/parsecookies
