exports = module.exports = function(container, logger) {
  // Load modules.
  var passport = require('passport');
  
  
  var authenticator = new passport.Authenticator();
  var schemeDecls = container.specs('http://i.bixbyjs.org/http/auth/Scheme');
  
  return Promise.all(schemeDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(plugins) {
      // Register HTTP authentication scheme plugins.
      plugins.forEach(function(plugin, i) {
        authenticator.use(schemeDecls[i].a['@scheme'] || plugin.name, plugin);
        logger.info('Registered HTTP authentication scheme: ' + (schemeDecls[i].a['@scheme'] || plugin.name));
      });
    })
    .then(function() {
      return authenticator;
    });
}

exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
exports['@implements'] = 'http://i.bixbyjs.org/http/Authenticator';
