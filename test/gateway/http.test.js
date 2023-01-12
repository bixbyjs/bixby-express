/* global describe, it, expect */

var expect = require('chai').expect;
var sinon = require('sinon');
var factory = require('../../app/gateway/http');
var EventEmitter = require('events').EventEmitter;


describe('gateway/http', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.equal('http://i.bixbyjs.org/http/Gateway');
  });
  
  describe('instantiating with defaults', function(done) {
    var gateway;
    
    var server = new EventEmitter();
    server.listen = sinon.stub().callsFake(function() {
      this.emit('listening');
    });
    server.address = sinon.stub().returns({ address: '127.0.0.1', port: 8080 });
    
    var container = new Object();
    container.create = sinon.stub()
    container.create.withArgs('module:http.Server').resolves(server);
    
    before(function(done) {
      factory(container).then(function(obj) {
        gateway = obj;
        done();
      }, done);
    });
    
    it('should provide gateway', function() {
      expect(gateway).to.be.an('object');
      expect(gateway.listen).to.be.a('function');
      expect(gateway.address).to.be.a('function');
      expect(gateway.on).to.be.a('function');
    });
    
    describe('#listen', function() {
      
      before(function(done) {
        gateway.listen(function() {
          done();
        })
      });
      
      it('should listen', function() {
        expect(server.listen).to.calledWith(8080, undefined);
      }); // should listen
      
    }); // #listen
    
  }); // instantiating with defaults
  
});
