exports = module.exports = function(verifyPassword) {
  var Strategy = require('passport-local');
  
  var strategy = new Strategy(verifyPassword);
  return strategy;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@require'] = [
  'http://i.bixbyjs.org/security/authentication/password/authenticate'
];
