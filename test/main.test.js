/* global describe, it */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../app/main');
var express = require('express');


describe('main', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/main');
  });
  
  describe('when app provides app-specific service', function(done) {
    var service = sinon.stub(express());
    
    var gateway = new Object();
    gateway.on = sinon.spy();
    gateway.listen = sinon.stub().yieldsOn(gateway);
    gateway.address = sinon.stub().returns({ address: '127.0.0.1', port: 8080 });
    
    var container = new Object();
    container.create = sinon.stub()
    container.create.withArgs('app/service').resolves(service);
    container.create.withArgs('./gateways').resolves([ gateway ]);
    
    var logger = new Object();
    logger.info = sinon.spy();
    
    before(function(done) {
      factory(container, logger).then(done, done);
    });
    
    it('should create site', function() {
      expect(container.create).to.be.calledTwice;
      expect(container.create.getCall(0)).to.be.calledWith('app/service');
      expect(container.create.getCall(1)).to.be.calledWith('./gateways');
    });
    
    it('should dispatch requests from gateway', function() {
      expect(gateway.on).to.be.calledWith('request', service);
      expect(gateway.listen).to.be.calledOnce;
    });
    
    it('should log', function() {
      expect(logger.info).to.be.calledOnce;
      expect(logger.info.getCall(0)).to.be.calledWith('HTTP server listening on %s:%d', '127.0.0.1', 8080);
    });
  }); // when app provides app-specific site
  
  describe('when app provides app-specific service and uses multiple gateways', function(done) {
    var service = sinon.stub(express());
    
    var gateway1 = new Object();
    gateway1.on = sinon.spy();
    gateway1.listen = sinon.stub().yieldsOn(gateway1);
    gateway1.address = sinon.stub().returns({ address: '127.0.0.1', port: 8080 });
    var gateway2 = new Object();
    gateway2.on = sinon.spy();
    gateway2.listen = sinon.stub().yieldsOn(gateway2);
    gateway2.address = sinon.stub().returns({ address: '127.0.0.1', port: 9000 });
    
    var container = new Object();
    container.create = sinon.stub()
    container.create.withArgs('app/service').resolves(service);
    container.create.withArgs('./gateways').resolves([ gateway1, gateway2 ]);
    
    var logger = new Object();
    logger.info = sinon.spy();
    
    before(function(done) {
      factory(container, logger).then(done, done);
    });
    
    it('should create site', function() {
      expect(container.create).to.be.calledTwice;
      expect(container.create.getCall(0)).to.be.calledWith('app/service');
      expect(container.create.getCall(1)).to.be.calledWith('./gateways');
    });
    
    it('should dispatch requests from gateways', function() {
      expect(gateway1.on).to.be.calledWith('request', service);
      expect(gateway1.listen).to.be.calledOnce;
      
      expect(gateway2.on).to.be.calledWith('request', service);
      expect(gateway2.listen).to.be.calledOnce;
    });
    
    it('should log', function() {
      expect(logger.info).to.be.calledTwice;
      expect(logger.info.getCall(0)).to.be.calledWith('HTTP server listening on %s:%d', '127.0.0.1', 8080);
      expect(logger.info.getCall(1)).to.be.calledWith('HTTP server listening on %s:%d', '127.0.0.1', 9000);
    });
  }); // when app provides app-specific site and uses multiple gateways
  
});
