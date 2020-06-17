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
    container.components.withArgs('http://i.bixbyjs.org/http/Gateway').returns([]);
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
  
  describe('when gateway components are instantiated', function(done) {
    var gateways;
    
    var gateway1 = new Object();
    var gateway2 = new Object();
    
    var gateway1Component = new Object();
    gateway1Component.create = sinon.stub().resolves(gateway1);
    var gateway2Component = new Object();
    gateway2Component.create = sinon.stub().resolves(gateway2);
    
    var container = new Object();
    container.components = sinon.stub()
    container.components.withArgs('http://i.bixbyjs.org/http/Gateway').returns([
      gateway1Component,
      gateway2Component
    ]);
    
    before(function(done) {
      factory(container).then(function(obj) {
        gateways = obj;
        done();
      }, done);
    });
    
    it('should provide gateways', function() {
      expect(gateways).to.be.an('array');
      expect(gateways).to.have.length(2);
      expect(gateways[0]).to.equal(gateway1);
      expect(gateways[1]).to.equal(gateway2);
    });
  }); // when gateway components are instantiated
  
});
