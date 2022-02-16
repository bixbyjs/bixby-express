/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/middleware/cors');


describe('middleware/cors', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/middleware/cors');
    expect(factory['@singleton']).to.equal(undefined);
  });
  
  it('should return setup function', function() {
    setup = factory();
    expect(setup).to.be.a('function');
  }); // should return setup function
  
  describe('setup function', function() {
    
    it('should create middleware with default options', function() {
      var cors = sinon.stub();
      cors.returns(function(req, res, next){});
      
      var factory = $require('../../app/middleware/cors',
        { 'cors': cors }
      );
      
      setup = factory();
      
      var middleware = setup();
      expect(cors).to.have.been.calledOnceWithExactly(undefined);
      expect(middleware).to.be.a('function');
      expect(middleware.length).to.equal(3);
    }); // should create middleware with default options
    
  }); // setup function
  
});
