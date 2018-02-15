exports = module.exports = function(IoC, logger) {
  // Load modules.
  var passport = require('passport');
  
  
  var authenticator = new passport.Authenticator();
  
  return Promise.resolve(authenticator)
    .then(function(authenticator) {
      // Register HTTP authentication schemes.
      var schemeComps = IoC.components('http://i.bixbyjs.org/http/auth/Scheme');
      
      return Promise.all(schemeComps.map(function(comp) { return comp.create(); } ))
        .then(function(schemes) {
          schemes.forEach(function(scheme, i) {
            authenticator.use(schemeComps[i].a['@scheme'] || scheme.name, scheme);
            logger.info('Loaded HTTP authentication scheme: ' + (schemeComps[i].a['@scheme'] || scheme.name));
          });
        })
        .then(function() {
          return authenticator;
        });
    })
    .then(function(authenticator) {
      // Register federated identity providers.
      var providerComps = IoC.components('http://i.bixbyjs.org/http/auth/Provider');
      
      return Promise.all(providerComps.map(function(comp) { return comp.create(); } ))
        .then(function(providers) {
          providers.forEach(function(provider, i) {
            authenticator.use(providerComps[i].a['@provider'], provider);
            logger.info('Loaded federated identity provider: ' + (providerComps[i].a['@provider']));
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
}

exports['@implements'] = 'http://i.bixbyjs.org/http/Authenticator';
exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
