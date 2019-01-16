exports = module.exports = function(IoC, logging, logger) {
  var express = require('express');
  
  
  var service = express();
  service.use(logging());
  
  return Promise.resolve(service)
    .then(function(service) {
      var components = IoC.components('http://i.bixbyjs.org/http/Service');
  
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(srvs) {
          srvs.forEach(function(srv, i) {
            var component = components[i]
              , path = component.a['@path'];
            
            // TODO: Improve how the path is determined, if it is not annotated
            //  ie, package namespace, etc
            // only prefix path if more than one service is present, otherwise use root
            
            if (srvs.length > 1) {
              // TODO: generate random path, if not specified
              
              logger.debug('Mounted HTTP service "' + component.id + '" at "' + path + '"');
              service.use(path, srv);
            } else {
              logger.debug('Mounted HTTP service "' + component.id + '" at "/"');
              service.use(srv);
            }
          });
        })
        .then(function() {
          return service;
        });
    })
    .then(function(service) {
      return service;
    });
};

exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/http/middleware/logging',
  'http://i.bixbyjs.org/Logger'
];
