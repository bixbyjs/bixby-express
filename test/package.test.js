/* global describe, it, expect */

var pkg = require('..');

describe('bixby-express', function() {
  
  it('should export factory', function() {
    expect(pkg).to.be.a('function');
  });
  
});
