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
  
  it('should return setup function', function() {
    expect(factory()).to.be.a('function');
  }); // should return setup function
  
  describe('middleware', function() {
    var cookieParserStub = sinon.stub().returns(function(req, res, next){});
    var setup = $require('../../app/middleware/parsecookies',
      { 'cookie-parser': cookieParserStub }
    )();
    
    it('should create middleware', function() {
      var middleware = setup();
      
      expect(cookieParserStub).to.have.been.calledOnceWithExactly();
      expect(middleware).to.be.a('function');
      expect(middleware.length).to.equal(3);
    }); // should create middleware with default options
  
  }); // middleware
  
}); // middleware/parsecookies
