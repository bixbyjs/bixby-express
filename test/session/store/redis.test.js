var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/session/store/redis');
// TODO: Remove redis dependency from test
var redis = require('redis');
var RedisStore = require('connect-redis')(require('express-session'));


describe('http/session/store', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.equal(true);
    expect(factory['@implements']).to.equal('module:express-session.Store');
    expect(factory['@service']).to.equal('sess-resp');
    expect(factory['@port']).to.equal(6379);
  });
  
  describe('creating with defaults', function() {
    var RedisStoreSpy = sinon.spy(RedisStore);
    var factory = $require('../../../app/session/store/redis',
      { 'connect-redis': function() { return RedisStoreSpy; } });
    
    var client = sinon.createStubInstance(redis.RedisClient);
    var _redis = new Object();
    _redis.createConnection = sinon.stub().returns(client);
    
    var store = factory(_redis, { host: 'redis.example.com', port: 6379 });
  
    it('should create connection', function() {
      expect(_redis.createConnection).to.have.been.calledOnce;
      expect(_redis.createConnection).to.have.been.calledWith({ host: 'redis.example.com', port: 6379 });
    });
  
    it('should construct store', function() {
      expect(RedisStoreSpy).to.have.been.calledOnce;
      expect(RedisStoreSpy).to.have.been.calledWithNew;
      expect(RedisStoreSpy).to.have.been.calledWith({ client: client });
    });
  
    it('should return store', function() {
      expect(store).to.be.an.instanceOf(RedisStore);
    });
  }); // creating with defaults
  
}); // http/session/store
