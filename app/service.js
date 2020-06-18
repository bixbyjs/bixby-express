exports = module.exports = function(IoC, logging, logger) {
  var express = require('express');
  
  
  var app = express();
  app.use(logging());
  
  return Promise.resolve(app)
    .then(function(app) {
      return new Promise(function(resolve, reject) {
        var components = IoC.components('http://i.bixbyjs.org/http/Service');
        
        (function iter(i) {
          var component = components[i]
            , path;
          if (!component) {
            return resolve(app);
          }
          
          path = component.a['@path'];
          
          component.create()
            .then(function(service) {
              if (components.length > 1) {
                // TODO: generate random path, if not specified
              
                logger.debug('Mounted HTTP service "' + component.id + '" at "' + path + '"');
                app.use(path, service);
              } else {
                logger.debug('Mounted HTTP service "' + component.id + '" at "/"');
                app.use(service);
              }
              iter(i + 1);
            }, function(err) {
              // WIP: make a developer error handler that prints the info to the dev when they access this route
              
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
    .then(function(app) {
      return app;
    });
};

exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/http/middleware/logging',
  'http://i.bixbyjs.org/Logger'
];
