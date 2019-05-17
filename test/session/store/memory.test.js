var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/session/store/memory');
var MemoryStore = require('express-session').MemoryStore;


describe('session/store/memory', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.be.undefined;
  });
  
  it('should create session store', function() {
    var store = factory();
    expect(store).to.be.an.instanceof(MemoryStore);
  });
  
}); // session/store
