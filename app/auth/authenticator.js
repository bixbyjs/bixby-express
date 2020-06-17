exports = module.exports = function(IoC, logger) {
  // Load modules.
  var passport = require('passport');
  
  
  var authenticator = new passport.Authenticator();
  
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
