/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/middleware/session');


describe('middleware/session', function() {
  var store = new Object();
  var vault = new Object();
  
  beforeEach(function() {
    vault.get = sinon.stub();
  });
  
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/middleware/session');
    expect(factory['@singleton']).to.equal(true);
  });
  
  it('should resolve with setup function', function(done) {
    vault.get.yieldsAsync(null, 'keyboard cat');
    
    factory(store, vault)
      .then(function(setup) {
        expect(vault.get).to.have.been.calledOnce;
        expect(setup).to.be.a('function');
        done();
      }).catch(done);
  }); // should resolve with middleware
  
  it('should reject when secret not available', function(done) {
    vault.get.yieldsAsync(null, undefined);
    
    factory(store, vault)
      .catch(function(err) {
        expect(err).to.be.an.instanceof(Error);
        expect(err.message).to.equal('Cannot get secret to sign and verify session ID cookie');
        done();
      })
      .catch(done);
  }); // should reject when secret not available
  
  it('should reject when vault encounters an error', function(done) {
    var error = new Error('Something went wrong');
    vault.get.yieldsAsync(error);
    
    factory(store, vault)
      .catch(function(err) {
        expect(err).to.equal(error);
        done();
      })
      .catch(done);
  }); // should reject when vault encounters an error
  
  describe('setup function', function() {
    
    it('should create middleware with default options', function(done) {
      var session = sinon.stub();
      session.returns(function(req, res, next){});
      var store = new Object();
      var vault = new Object();
      vault.get = sinon.stub();
      vault.get.yieldsAsync(null, 'keyboard cat');
      
      var factory = $require('../../app/middleware/session',
        { 'express-session': session }
      );
      
      factory(store, vault)
        .then(function(setup) {
          var middleware = setup();
          
          expect(session).to.have.been.calledOnceWithExactly({
            secret: 'keyboard cat',
            resave: false,
            saveUninitialized: false,
            store: store
          });
          expect(middleware).to.be.a('function');
          expect(middleware.length).to.equal(3);
          done();
        })
        .catch(done);
    }); // should create middleware with default options
    
  }); // setup function
  
}); // middleware/session
