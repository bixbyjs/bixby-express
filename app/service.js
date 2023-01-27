/**
 * Default service.
 *
 * This component provides a default Express app which eliminates the
 * boilerplate typically used in most applications.
 */
exports = module.exports = function(IoC, settings, logger) {
  var express = require('express')
    , implementationNotFound = require('../lib/middleware/implementationnotfound')
    , path = require('path');
  
  // https://github.com/expressjs/express/issues/3057
  // https://stackoverflow.com/questions/41146164/nodejs-diffrence-between-express-and-express-router-in-sub-routes
  
  
  var app = express();
  
  app.set('views', path.resolve(path.dirname(require.main.filename), settings.get('views/path') || 'app/views'));
  app.set('view engine', settings.get('views/engine') || 'ejs');
  
  // TODO: Mount static middleware, if directory exists
  app.use(express.static(path.resolve(path.dirname(require.main.filename), 'public')));
  
  // TODO: Remove this middleware (and above) and let app specify it?
  app.use(require('morgan')('common'));
  
  return Promise.resolve(app)
    .then(function(app) {
      // Register template engines.
      return new Promise(function(resolve, reject) {
        var components = IoC.components('http://i.bixbyjs.org/template/Engine');
        
        // FIXME: console.log not available here???
        
        (function iter(i) {
          var component = components[i];
          if (!component) {
            return resolve(app);
          }
          
          if (components.length == 1) {
            //console.log('SET THE DEFAULT VIEW ENING!');
            //console.log(components[0].a['@type']);
            app.set('view engine', components[0].a['@type']);
          }
        
          component.create()
            .then(function(engine) {
              logger.info('Loaded template engine: ' + component.a['@type']);
              app.engine(component.a['@type'], engine.renderFile);
              iter(i + 1);
            }, function(err) {
              var msg = 'Failed to load template engine: ' + component.a['@type'] + '\n';
              msg += err.stack;
              logger.warning(msg);
              return iter(i + 1);
            })
        })(0);
      });
    })
    .then(function(app) {
      // Register template engines.
      return new Promise(function(resolve, reject) {
        var components = IoC.components('module:express.ApplicationRequestHandler');
        
        //console.log('~~~ LOADING APP LEVEL MIDDLEWARE ~~~');
        //console.log(components);
        
        (function iter(i) {
          var component = components[i];
          if (!component) {
            return resolve(app);
          }
        
          component.create()
            .then(function(middleware) {
              logger.info('Loaded middleware: ' + component.id);
              
              //console.log(component)
              
              app.use(middleware);
              iter(i + 1);
            }, function(err) {
              // TODO: Improve this error
              var msg = 'Failed to load middleware: ' + component.id + '\n';
              msg += err.stack;
              logger.warning(msg);
              return iter(i + 1);
            })
        })(0);
      });
    })
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
              // TODO: Print the package name in the error, so it can be found
              // TODO: Make the error have the stack of dependencies.
              if (err.code == 'IMPLEMENTATION_NOT_FOUND') {
                logger.notice(err.message + ' while loading component ' + component.id);
                
                // TODO: Only mount implNotFound handler in development?
                
                if (components.length > 1) {
                  // TODO: generate random path, if not specified
                  
                  app.use(path, implementationNotFound(err));
                } else {
                  app.use(implementationNotFound(err));
                }
                
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

//exports['@implements'] = 'module:express.Application';
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Settings',
  'http://i.bixbyjs.org/Logger'
];
