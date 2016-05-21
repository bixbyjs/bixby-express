exports = module.exports = function(authenticator, settings) {
  settings = settings.isolate(this.baseNS);
  
  var options = settings.get('auth') || {};
  
  var schemes = options.scheme || options.schemes || 'bearer';
  return authenticator.authenticate(schemes, { session: false, failWithError: true });
}

exports['@require'] = [ 'http://i.expressjs.com/Authenticator', 'http://i.bixbyjs.org/Settings' ];
exports['@implements'] = 'http://i.expressjs.com/middleware/authenticate';
