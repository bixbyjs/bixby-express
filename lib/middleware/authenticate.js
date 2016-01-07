exports = module.exports = function(authenticator) {
  // TODO: Make strategy configurable.
  
  return authenticator.authenticate('bearer', { session: false, failWithError: true });
}

exports['@require'] = [ 'http://i.expressjs.com/Authenticator' ];
exports['@implements'] = 'http://i.expressjs.com/middleware/authenticate';
