exports = module.exports = function(IoC, logger) {
  var express = require('express');
  
  
  var service = express();
  
  return Promise.resolve(service)
    .then(function(service) {
      var httpServices = IoC.components('http://i.bixbyjs.org/http/Service');
  
      return Promise.all(httpServices.map(function(comp) { return comp.create(); } ))
        .then(function(srvs) {
          srvs.forEach(function(srv, i) {
            logger.info('Loaded HTTP service: ' + httpServices[i].a['@path']);
            
            var path = httpServices[i].a['@path'];
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
