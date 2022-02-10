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
    container.create = sinon.stub().resolves(store);
    
    factory(container, undefined)
      .then(function(obj) {
        expect(container.create).have.been.calledWith('http://i.bixbyjs.org/http/SessionStore');
        expect(obj).to.equal(store);
        done();
      }).catch(done);
  }); // should resolve with store from IoC container
  
  it('should resolve with memory store as last resort in development environment', function(done) {
    sinon.stub(_container, 'components').returns([ { a: { '@name': 'sess-redis' } } ]);
    var error = new Error('querySrv ENOTFOUND sess-redis');
    error.code = 'ENOTFOUND';
    var _connect = sinon.stub().yieldsAsync(error);
    sinon.stub(_container, 'create').returns(new MemoryStore());
    
    process.env.NODE_ENV = 'development';
    var promise = factory(_container, _connect, _logger);
    promise.then(function(store) {
      expect(_container.components).to.have.been.calledWith('http://i.bixbyjs.org/http/ISessionStore');
      expect(_connect).to.have.been.calledWith([ 'sess-redis' ]);
      expect(_container.create).to.have.been.calledOnceWith('./store/memory');
      expect(store).to.be.an.instanceof(MemoryStore);
      done();
    }).catch(done);
  }); // should resolve with memory store as last resort in development environment
  
}); // session/store
