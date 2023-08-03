/**
 * Create authenticator.
 *
 * @returns {passport.Authenticator}
 */
exports = module.exports = function(IoC, logger) {
  // Load modules.
  var passport = require('passport');
  
  
  var authenticator = new passport.Authenticator();
  
  // TODO:
  // authenticator.sessions(manager);
  // authenticator.unuse('session');
  // TODO: Make session scheme strict
  //authenticator.use('session', sessionScheme);
  //authenticator.use('anonymous', anonymousScheme);
  
  // TODO: Resolve login endpoint and set it as an option to default failureRedirect option.
  
  // TODO: Remove session support here
  authenticator.serializeUser(function(user, cb) {
    console.log('SERIALIZE!!!!');
    
    cb(null, user);
  });

  authenticator.deserializeUser(function(obj, cb) {
    console.log('DESERIALIZE!!!!');
    
    cb(null, obj);
  });
  
  return Promise.resolve(authenticator)
    .then(function(authenticator) {
      // Register HTTP authentication schemes.
      return new Promise(function(resolve, reject) {
        var components = IoC.components('http://i.bixbyjs.org/http/auth/Scheme');
        
        (function iter(i) {
          var component = components[i];
          if (!component) {
            return resolve(authenticator);
          }
          
          component.create()
            .then(function(scheme) {
              logger.info('Loaded HTTP authentication scheme: ' + (component.a['@scheme'] || scheme.name));
              
              authenticator.use(component.a['@scheme'] || scheme.name, scheme);
              iter(i + 1);
            }, function(err) {
              // TODO: Print the package name in the error, so it can be found
              // TODO: Make the error have the stack of dependencies.
              if (err.code == 'IMPLEMENTATION_NOT_FOUND') {
                logger.notice(err.message + ' while loading component ' + component.id);
                return iter(i + 1);
              }
              
              reject(err);
            })
        })(0);
      });
    })
    .then(function(authenticator) {
      // TODO: Remove session support here
      
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
exports['@implements'] = 'module:passport.Authenticator';
exports['@require'] = [ '!container', 'http://i.bixbyjs.org/Logger' ];
