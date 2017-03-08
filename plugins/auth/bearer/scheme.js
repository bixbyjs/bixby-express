exports = module.exports = function(verify) {
  var Strategy = require('passport-http-bearer');
  
  var strategy = new Strategy({ passReqToCallback: true }, verify);
  return strategy;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
exports['@scheme'] = 'bearer';
exports['@require'] = [
  './verify'
];
