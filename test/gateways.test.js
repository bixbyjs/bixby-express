/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../app/gateways');


describe('gateway', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal(undefined);
  });
  
  describe('when app uses default gateway', function(done) {
    var gateways;
    
    var gateway = new Object();
    
    var container = new Object();
    container.components = sinon.stub()
    container.components.withArgs('http://i.bixbyjs.org/http/Gateway').resolves([]);
    container.create = sinon.stub()
    container.create.withArgs('./gateway/http').resolves(gateway);
    
    before(function(done) {
      factory(container).then(function(obj) {
        gateways = obj;
        done();
      }, done);
    });
    
    it('should provide gateways', function() {
      expect(gateways).to.be.an('array');
      expect(gateways).to.have.length(1);
      expect(gateways[0]).to.equal(gateway);
    });
  }); // when app uses default gateway
  
});
