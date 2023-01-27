/* global describe, it, expect */

var sinon = require('sinon');


describe('bixby-express', function() {
  
  describe('package.json', function() {
    var json = require('../package.json');
    
    it('should have assembly metadata', function() {
      expect(json.assembly.namespace).to.equal('http');
      
      expect(json.assembly.components).to.have.length(6);
      expect(json.assembly.components).to.include('main');
      expect(json.assembly.components).to.include('middleware/errorlogging');
      expect(json.assembly.components).to.include('session/stores/memory');
      expect(json.assembly.components).to.include('session/stores/redis');
    });
  });
  
  it.skip('should throw if required', function() {
    expect(function() {
      var pkg = require('..');
    }).to.throw(Error).with.property('code', 'MODULE_NOT_FOUND');
  });
  
});

afterEach(function() {
  sinon.restore();
});
