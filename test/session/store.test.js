var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/session/store');
var MemoryStore = require('express-session').MemoryStore;


function MockSessionStore(){};

describe('session/store', function() {
  var NODE_ENV;
  
  var _container = {
    components: function(){},
    create: function(){}
  };
  var _logger = {
    emergency: function(){},
    alert: function(){},
    critical: function(){},
    error: function(){},
    warning: function(){},
    notice: function(){},
    info: function(){},
    debug: function(){}
  };
  
  beforeEach(function() {
    NODE_ENV = process.env.NODE_ENV;
  });
  
  afterEach(function() {
    process.env.NODE_ENV = NODE_ENV;
  });
  
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.equal(true);
  });
  
  it('should resolve with store from IoC container', function(done) {
    var store = new Object();
    var container = new Object();
    container.create = sinon.stub();
    container.create.resolves(store);
    
    factory(container, undefined)
      .then(function(obj) {
        expect(container.create).have.been.calledWith('http://i.bixbyjs.org/http/SessionStore');
        expect(obj).to.equal(store);
        done();
      }).catch(done);
  }); // should resolve with store from IoC container
  
  it('should resolve with memory store as last resort in development environment', function(done) {
    var error = new Error('Unable...');
    var store = new Object();
    var container = new Object();
    container.create = sinon.stub();
    container.create.withArgs('http://i.bixbyjs.org/http/SessionStore').rejects(error);
    container.create.withArgs('./store/memory').resolves(store);
    
    var logger = new Object();
    logger.notice = sinon.spy();
    
    process.env.NODE_ENV = 'development';
    var promise = factory(container, logger);
    promise.then(function(obj) {
      expect(container.create).have.been.calledTwice;
      expect(container.create.getCall(0).args[0]).to.equal('http://i.bixbyjs.org/http/SessionStore');
      expect(container.create.getCall(1).args[0]).to.equal('./store/memory');
      expect(obj).to.equal(store);
      done();
    }).catch(done);
  }); // should resolve with memory store as last resort in development environment
  
}); // session/store
