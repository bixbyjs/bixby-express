exports = module.exports = function(authenticator) {
  
  return function(strategy) {
    strategy = strategy || 'local'; // TODO: Default to used strategies
    
    var opts = { failWithError: true, session: false };
    if (strategy === 'local') {
      opts.session = true;
    }
    
    //return authenticator.authenticate(strategy, opts);
    // FIXME: Remove the need for initialze middleware.
    return [
      authenticator.initialize(),
      authenticator.authenticate(strategy, opts)
    ];
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/authenticate';
exports['@require'] = [
  '../auth/authenticator'
];
