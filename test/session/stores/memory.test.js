var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../../app/session/stores/memory');
var MemoryStore = require('express-session').MemoryStore;


describe('session/store/memory', function() {
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.equal(true);
  });
  
  it('should create session store', function() {
    var store = factory();
    expect(store).to.be.an.instanceof(MemoryStore);
  });
  
}); // session/store
