/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/middleware/csrfprotection');


describe('middleware/csrfprotection', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/middleware/csrfProtection');
    expect(factory['@singleton']).to.equal(true);
  });
  
  it('should return setup function', function() {
    expect(factory()).to.be.a('function');
  }); // should return setup function
  
  describe('setup', function() {
    var parseCookiesStub = sinon.stub().returns(function parseCookies(req, res, next){});
    var sessionStub = sinon.stub().returns(function session(req, res, next){});
    
    var csurfStub = sinon.stub().returns(function(req, res, next){});
    var setup = $require('../../app/middleware/csrfprotection',
      { 'csurf': csurfStub }
    )(sessionStub, parseCookiesStub);
    
    it('should create middleware', function() {
      var middleware = setup();
      
      expect(parseCookiesStub).to.have.been.calledOnceWithExactly();
      expect(sessionStub).to.have.not.been.called;
      expect(csurfStub).to.have.been.calledOnceWithExactly({ cookie: true });
      expect(middleware).to.be.an('array');
      expect(middleware.length).to.equal(2);
      expect(middleware[0].name).to.equal('parseCookies');
      expect(middleware[1].length).to.equal(3);
    }); // should create middleware with default options
  
  }); // setup
  
}); // middleware/csrfprotection
