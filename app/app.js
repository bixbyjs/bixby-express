exports = module.exports = function(IoC, gateways, logger) {
  var normalizePort = require('../lib/utils').normalizePort;
  
  
  return Promise.resolve(IoC.create('service'))
    .catch(function(err) {
      // TODO: Check that the error is failure to create app/service
      return IoC.create('./service');
      throw err;
    })
    .then(function(service) {
      return Promise.all(gateways())
        .then(function(gateways) {
          gateways.forEach(function(gateway, i) {
            // Dispatch requests to the service, which in this case is an
            // Express app.
            gateway.on('request', service);
          });
        });
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/Main';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './gateways',
  'http://i.bixbyjs.org/Logger'
];
