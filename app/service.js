exports = module.exports = function(IoC, logger) {
  var express = require('express');
  
  
  var service = express();
  
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
            
            logger.info('Loaded HTTP service: ' + path);
            if (path) {
              service.use(path, srv);
            } else {
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
  'http://i.bixbyjs.org/Logger'
];
