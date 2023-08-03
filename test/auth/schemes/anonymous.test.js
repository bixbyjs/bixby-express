var expect = require('chai').expect;
var $require = require('proxyquire');
var sinon = require('sinon');
var factory = require('../../../app/auth/schemes/anonymous');
var Strategy = require('passport-anonymous').Strategy;


describe('schemes/anonymous', function() {
  
  it('should be annotated', function() {
    expect(factory['@singleton']).to.equal(true);
  });
  
  it('should construct Strategy', function() {
    var StrategySpy = sinon.spy(Strategy);
    var factory = $require('../../../app/auth/schemes/anonymous', {
      'passport-anonymous': { Strategy: StrategySpy }
    });
    
    var scheme = factory();
    
    expect(StrategySpy).to.have.been.calledOnce;
    expect(StrategySpy).to.have.been.calledWithNew;
    expect(scheme).to.be.an.instanceOf(Strategy);
  });
  
});
