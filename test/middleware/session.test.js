/* global describe, it, expect */

var $require = require('proxyquire');
var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/middleware/session');


function MockSessionStore(){};

describe('middleware/session', function() {
  var store = new Object();
  var vault = new Object();
  
  var _container = {
    components: function(){},
    create: function(){}
  };
  
  beforeEach(function() {
    vault.get = sinon.stub();
  });
  
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/middleware/session');
    expect(factory['@singleton']).to.equal(true);
  });
  
  it('should resolve with setup function', function(done) {
    vault.get.yieldsAsync(null, 'keyboard cat');
    
    factory(_container, store, vault)
      .then(function(setup) {
        expect(vault.get).to.have.been.calledOnce;
        expect(setup).to.be.a('function');
        done();
      }).catch(done);
  }); // should resolve with middleware
  
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
      
      factory(_container, store, vault)
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
