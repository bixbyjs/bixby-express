var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/session/store');
var MemoryStore = require('express-session').MemoryStore;


describe('session/store', function() {
  var NODE_ENV;
  var container = new Object();
  var logger = new Object();
  
  beforeEach(function() {
    NODE_ENV = process.env.NODE_ENV;
    
    container.create = sinon.stub();
    
    logger.emergency = sinon.spy();
    logger.alert = sinon.spy();
    logger.critical = sinon.spy();
    logger.error = sinon.spy();
    logger.warning = sinon.spy();
    logger.notice = sinon.spy();
    logger.info = sinon.spy();
    logger.debug = sinon.spy();
  });
  
  afterEach(function() {
    process.env.NODE_ENV = NODE_ENV;
  });
  
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.equal(true);
  });
  
  it('should resolve with application-supplied store', function(done) {
    var store = new Object();
    container.create.resolves(store);
    
    factory(container, logger)
      .then(function(obj) {
        expect(container.create).have.been.calledOnce;
        expect(container.create).have.been.calledWith('http://i.bixbyjs.org/http/SessionStore');
        expect(obj).to.equal(store);
        done();
      })
      .catch(done);
  }); // should resolve with application-supplied store
  
  it('should resolve with memory store in development environment when implementation not found', function(done) {
    process.env.NODE_ENV = 'development';
    
    var error = new Error('Cannot find implementation');
    error.code = 'IMPLEMENTATION_NOT_FOUND';
    error.interface = 'http://i.bixbyjs.org/http/SessionStore';
    container.create.withArgs('http://i.bixbyjs.org/http/SessionStore').rejects(error);
    
    var store = new Object();
    container.create.withArgs('./store/memory').resolves(store);
    
    factory(container, logger)
      .then(function(obj) {
        expect(container.create).have.been.calledTwice;
        expect(container.create.getCall(0).args[0]).to.equal('http://i.bixbyjs.org/http/SessionStore');
        expect(container.create.getCall(1).args[0]).to.equal('./store/memory');
        expect(obj).to.equal(store);
        done();
      })
      .catch(done);
  }); // should resolve with memory store in development environment when implementation not found
  
}); // session/store
