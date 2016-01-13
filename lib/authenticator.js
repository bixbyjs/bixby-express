exports = module.exports = function(container, logger) {
  // Load modules.
  var passport = require('passport');
  
  
  var authenticator = new passport.Authenticator();
  
  var specs = container.specs()
    , spec, scheme, i, len;
  for (i = 0, len = specs.length; i < len; ++i) {
    spec = specs[i];
    if ((spec.implements || []).indexOf('http://i.bixbyjs.org/http/auth/Scheme') !== -1) {
      // This specification declares an HTTP authentication scheme.  Create the
      // scheme and plug it in to the Passport `Authenticator` instance.
      scheme = container.create(spec.id);
      authenticator.use(spec.a['@scheme'] || scheme.name, scheme);
      logger.info('Registered HTTP authentication scheme: ' + (spec.a['@scheme'] || scheme.name));
    }
  }
  
  return authenticator;
}

exports['@singleton'] = true;
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
exports['@implements'] = 'http://i.expressjs.com/Authenticator';
