exports = module.exports = function(authenticator) {
  var merge = require('utils-merge');
  
  
  return function(strategy, options) {
    strategy = strategy || 'local'; // TODO: Default to used strategies
    
    var _options = { failWithError: true, session: false };
    if (strategy === 'local') {
      _options.session = true;
    }
    
    merge(_options, options);
    
    return authenticator.authenticate(strategy, _options);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/authenticate';
exports['@require'] = [
  '../auth/authenticator'
];
