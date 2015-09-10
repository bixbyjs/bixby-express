exports = module.exports = function() {
  var passport = require('passport');
  
  var authenticator = new passport.Authenticator();
  return authenticator;
}


exports['@provides'] = 'org.bixbyjs.http.Authenticator';
// TODO: Require by interface
exports['@require'] = [  ];
exports['@singleton'] = true;

