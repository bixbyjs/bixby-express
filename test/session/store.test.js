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
  
  it('should resolve with session store found via service discovery', function(done) {
    sinon.stub(_container, 'components').returns([ { a: { '@name': 'sessions-mock' } } ]);
    var _connect = sinon.stub().yieldsAsync(null, new MockSessionStore());
    
    var promise = factory(_container, _connect, _logger);
    promise.then(function(store) {
      expect(_connect).to.have.been.calledWith([ 'sessions-mock' ]);
      expect(store).to.be.an.instanceof(MockSessionStore);
      done();
    }).catch(done);
  }); // should resolve with session store found via service discovery
  
  it('should resolve with memory store as last resort in development environment', function(done) {
    sinon.stub(_container, 'components').returns([ { a: { '@name': 'sess-redis' } } ]);
    var error = new Error('querySrv ENOTFOUND sess-redis');
    error.code = 'ENOTFOUND';
    var _connect = sinon.stub().yieldsAsync(error);
    sinon.stub(_container, 'create').returns(new MemoryStore());
    
    process.env.NODE_ENV = 'development';
    var promise = factory(_container, _connect, _logger);
    promise.then(function(store) {
      expect(_connect).to.have.been.calledWith([ 'sess-redis' ]);
      expect(_container.create).to.have.been.calledOnceWith('./store/memory');
      expect(store).to.be.an.instanceof(MemoryStore);
      done();
    }).catch(done);
  }); // should resolve with memory store as last resort in development environment
  
}); // session/store
