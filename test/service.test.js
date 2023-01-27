/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../app/service');
var express = require('express');


describe('service', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    //expect(factory['@implements']).to.equal('module:express.Application');
  });
  
  describe('instantiating with multiple services', function(done) {
    var app;
    
    var service1 = new express.Router();
    var service2 = new express.Router();
    
    var service1Component = new Object();
    service1Component.create = sinon.stub().resolves(service1);
    service1Component.a = { '@path': '/beep' };
    var service2Component = new Object();
    service2Component.create = sinon.stub().resolves(service2);
    service2Component.a = { '@path': '/boop' };
    
    var container = new Object();
    container.components = sinon.stub()
    container.components.withArgs('http://i.bixbyjs.org/http/Service').returns([
      service1Component,
      service2Component
    ]);
    container.components.withArgs().returns([]);
    //container.create = sinon.stub()
    //container.create.withArgs('http://i.bixbyjs.org/http/Server').resolves(server);
    
    var settings = new Object();
    settings.get = sinon.stub();
    settings.get.returns(undefined);
    
    var logger = new Object();
    logger.notice = sinon.spy();
    logger.debug = sinon.spy();
    
    
    before(function(done) {
      factory(container, settings, logger).then(function(obj) {
        app = obj;
        done();
      }, done);
    });
    
    it('should provide service', function() {
      expect(app).to.be.a('function');
    });
  }); // instantiating with multiple services
  
});
