exports = module.exports = function(verifyToken) {
  var Strategy = require('passport-http-bearer');
  
  var strategy = new Strategy(verifyToken);
  return strategy;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'bearer';
exports['@require'] = [
  'http://i.bixbyjs.org/aaa/token/authenticate'
];
