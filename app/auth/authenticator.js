exports = module.exports = function(IoC, logger) {
  // Load modules.
  var passport = require('passport');
  
  
  var authenticator = new passport.Authenticator();
  
  return Promise.resolve(authenticator)
    .then(function(authenticator) {
      // Register HTTP authentication schemes.
      var components = IoC.components('http://i.bixbyjs.org/http/auth/Scheme');
      
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(schemes) {
          schemes.forEach(function(scheme, i) {
            authenticator.use(components[i].a['@scheme'] || scheme.name, scheme);
            logger.info('Loaded HTTP authentication scheme: ' + (components[i].a['@scheme'] || scheme.name));
          });
        })
        .then(function() {
          return authenticator;
        });
    })
    .then(function(authenticator) {
      // Add session support, if required components are available.
      return IoC.create('http://i.bixbyjs.org/http/auth/SessionManager')
        .then(
          function(sessionManager) {
            authenticator.serializeUser(sessionManager.serializeUser);
            authenticator.deserializeUser(sessionManager.deserializeUser);
          }, function(err) {
            logger.notice('HTTP session management not available')
          }
        )
        .then(function() {
          return authenticator;
        });
    })
    .then(function(authenticator) {
      return authenticator;
    });
};

exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
