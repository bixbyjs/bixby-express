var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/session/store');
var MemoryStore = require('express-session').MemoryStore;


function MockSessionStore(){};

describe('session/store', function() {
  var NODE_ENV;
  
  var _container = {
    create: function(){}
  };
  var _logger = {
    notice: function(){}
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
    var _connect = sinon.stub().yieldsAsync(null, new MockSessionStore());
    
    var promise = factory(null, _connect, null);
    promise.then(function(store) {
      expect(_connect).to.have.been.calledWith([ 'sessions-mongodb' ]);
      expect(store).to.be.an.instanceof(MockSessionStore);
      done();
    }, done);
  }); // should resolve with session store found via service discovery
  
  it('should resolve with memory store in development environment', function(done) {
    var error = new Error('querySrv ENOTFOUND _sessions.local');
    error.code = 'ENOTFOUND';
    var _connect = sinon.stub().yieldsAsync(error);
    sinon.stub(_container, 'create').returns(new MemoryStore());
    
    process.env.NODE_ENV = 'development';
    var promise = factory(_container, _connect, _logger);
    promise.then(function(store) {
      expect(_connect).to.have.been.calledWith([ 'sessions-mongodb' ]);
      expect(_container.create).to.have.been.calledOnceWith('./store/memory');
      expect(store).to.be.an.instanceof(MemoryStore);
      done();
    }).catch(done);
  }); // should resolve with session store found via service discovery
  
}); // session/store
