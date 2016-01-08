exports = module.exports = function(authenticator, settings) {
  var options = settings.get('auth') || {};
  
  var schemes = options.scheme || options.schemes || 'bearer';
  return authenticator.authenticate(schemes, { session: false, failWithError: true });
}

exports['@require'] = [ 'http://i.expressjs.com/Authenticator', '$settings' ];
exports['@implements'] = 'http://i.expressjs.com/middleware/authenticate';
