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
  
  describe('when app uses default service', function(done) {
    var service = sinon.stub(express());
    
    var gateway = new Object();
    gateway.on = sinon.spy();
    gateway.listen = sinon.stub().yieldsOn(gateway);
    gateway.address = sinon.stub().returns({ address: '127.0.0.1', port: 8080 });
    
    var error = new Error('something went wrong');
    error.code = 'IMPLEMENTATION_NOT_FOUND';
    error.interface = 'app/service';
    
    var container = new Object();
    container.create = sinon.stub()
    container.create.withArgs('app/service', { meta: true }).rejects(error);
    container.create.withArgs('./service').resolves(service);
    container.create.withArgs('./gateways').resolves([ gateway ]);
    
    var logger = new Object();
    logger.info = sinon.spy();
    
    before(function(done) {
      factory(container, logger).then(done, done);
    });
    
    it('should create service', function() {
      expect(container.create).to.be.calledThrice;
      expect(container.create.getCall(0)).to.be.calledWith('app/service');
      expect(container.create.getCall(1)).to.be.calledWith('./service');
      expect(container.create.getCall(2)).to.be.calledWith('./gateways');
    });
    
    it('should dispatch requests from gateway', function() {
      expect(gateway.on).to.be.calledWith('request', service);
      expect(gateway.listen).to.be.calledOnce;
    });
    
    it('should log messages', function() {
      expect(logger.info).to.be.calledOnce;
      expect(logger.info.getCall(0)).to.be.calledWith('HTTP server listening on %s:%d', '127.0.0.1', 8080);
    });
  }); // when app uses default service
  
  describe('when app provides app-specific service', function(done) {
    var service = sinon.stub(express());
    
    var gateway = new Object();
    gateway.on = sinon.spy();
    gateway.listen = sinon.stub().yieldsOn(gateway);
    gateway.address = sinon.stub().returns({ address: '127.0.0.1', port: 8080 });
    
    var container = new Object();
    container.create = sinon.stub()
    container.create.withArgs('app/service', { meta: true }).resolves([ service, {
      implements: [],
      a: {}
    } ]);
    container.create.withArgs('./gateways').resolves([ gateway ]);
    
    var logger = new Object();
    logger.info = sinon.spy();
    
    before(function(done) {
      factory(container, logger).then(done, done);
    });
    
    it('should create service', function() {
      expect(container.create).to.be.calledTwice;
      expect(container.create.getCall(0)).to.be.calledWith('app/service');
      expect(container.create.getCall(1)).to.be.calledWith('./gateways');
    });
    
    it('should dispatch requests from gateway', function() {
      expect(gateway.on).to.be.calledWith('request', service);
      expect(gateway.listen).to.be.calledOnce;
    });
    
    it('should log messages', function() {
      expect(logger.info).to.be.calledOnce;
      expect(logger.info.getCall(0)).to.be.calledWith('HTTP server listening on %s:%d', '127.0.0.1', 8080);
    });
  }); // when app provides app-specific service
  
  describe('when app provides app-specific service to be mounted by default service', function(done) {
    var service = sinon.stub(express());
    
    var gateway = new Object();
    gateway.on = sinon.spy();
    gateway.listen = sinon.stub().yieldsOn(gateway);
    gateway.address = sinon.stub().returns({ address: '127.0.0.1', port: 8080 });
    
    var container = new Object();
    container.create = sinon.stub()
    container.create.withArgs('app/service', { meta: true }).resolves([ service, {
      implements: [ 'http://i.bixbyjs.org/http/Service'] ,
      a: { '@path': '/' }
    } ]);
    container.create.withArgs('./service').resolves(service);
    container.create.withArgs('./gateways').resolves([ gateway ]);
    
    var logger = new Object();
    logger.info = sinon.spy();
    
    before(function(done) {
      factory(container, logger).then(done, done);
    });
    
    it('should create service', function() {
      expect(container.create).to.be.calledThrice;
      expect(container.create.getCall(0)).to.be.calledWith('app/service');
      expect(container.create.getCall(1)).to.be.calledWith('./service');
      expect(container.create.getCall(2)).to.be.calledWith('./gateways');
    });
    
    it('should dispatch requests from gateway', function() {
      expect(gateway.on).to.be.calledWith('request', service);
      expect(gateway.listen).to.be.calledOnce;
    });
    
    it('should log messages', function() {
      expect(logger.info).to.be.calledOnce;
      expect(logger.info.getCall(0)).to.be.calledWith('HTTP server listening on %s:%d', '127.0.0.1', 8080);
    });
  }); // when app provides app-specific service to be mounted by default service
  
  describe('when app provides app-specific service that fails to be created', function(done) {
    var service = sinon.stub(express());
    
    var gateway = new Object();
    gateway.on = sinon.spy();
    gateway.listen = sinon.stub().yieldsOn(gateway);
    gateway.address = sinon.stub().returns({ address: '127.0.0.1', port: 8080 });
    
    var container = new Object();
    container.create = sinon.stub()
    container.create.withArgs('app/service', { meta: true }).rejects(new Error('something went wrong'));
    container.create.withArgs('./gateways').resolves([ gateway ]);
    
    var logger = new Object();
    logger.info = sinon.spy();
    
    var error;
    
    before(function(done) {
      factory(container, logger).then(
        function() {
          return done(new Error('should not create service'));
        },
        function(err) {
          error = err;
          return done();
        });
    });
    
    it('should attempt to create service', function() {
      expect(container.create).to.be.calledOnce;
      expect(container.create.getCall(0)).to.be.calledWith('app/service');
    });
    
    it('should not dispatch requests from gateway', function() {
      expect(gateway.on).to.not.be.called;
      expect(gateway.listen).to.not.be.calledOnce;
    });
    
    it('should rethrow error', function() {
      expect(error.message).to.equal('something went wrong');
    });
  }); // when app provides app-specific site that fails to be created
  
  describe('when app supports multiple gateways', function(done) {
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
    container.create.withArgs('app/service', { meta: true }).resolves([ service, {
      implements: [],
      a: {}
    } ]);
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
    
    it('should log messages', function() {
      expect(logger.info).to.be.calledTwice;
      expect(logger.info.getCall(0)).to.be.calledWith('HTTP server listening on %s:%d', '127.0.0.1', 8080);
      expect(logger.info.getCall(1)).to.be.calledWith('HTTP server listening on %s:%d', '127.0.0.1', 9000);
    });
  }); // when app supports multiple gateways
  
});
