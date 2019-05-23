/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/middleware/session');


function MockSessionStore(){};

describe('middleware/session', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/middleware/session');
    expect(factory['@singleton']).to.equal(true);
  });
  
  it('should resolve with setup function', function(done) {
    var _store = new MockSessionStore();
    var _keyring = { get: function(){} };
    sinon.stub(_keyring, 'get').yieldsAsync(null, { password: 'keyboard cat' });
    
    var sessionStub = sinon.stub().returns(function(req, res, next){});
    var factory = $require('../../app/middleware/session',
      { 'express-session': sessionStub }
    );
    
    var promise = factory(_store, _keyring);
    promise.then(function(setup) {
      //expect(sessionStub).to.have.been.calledOnce;
      /*
      expect(sessionStub).to.have.been.calledOnceWithExactly({
        //store: _store,
        //resave: false,
        //saveUninitialized: false,
        //secret: 'keyboard cat'
      });
      */
      expect(setup).to.be.a('function');
      done();
    }).catch(done);
  }); // should resolve with middleware
  
  describe('setup', function() {
    var _store = new MockSessionStore();
    var _keyring = { get: function(){} };
    sinon.stub(_keyring, 'get').yieldsAsync(null, { password: 'keyboard cat' });
    
    var sessionStub = sinon.stub().returns(function(req, res, next){});
    var promise = $require('../../app/middleware/session',
      { 'express-session': sessionStub }
    )(_store, _keyring);
    var setup;
    
    
    beforeEach(function(done) {
      console.log('RESOLVE THE PROMISE...');
      promise.then(function(s) {
        setup = s;
        done();
      });
    });
    
    it('should create middleware with default options', function() {
      var middleware = setup();
      
      expect(sessionStub).to.have.been.calledOnceWithExactly({
        store: _store,
        resave: false,
        saveUninitialized: false,
        secret: 'keyboard cat'
      });
      expect(middleware).to.be.a('function');
      expect(middleware.length).to.equal(3);
    }); // should create middleware with default options
    
    
  }); // middleware
  
});
