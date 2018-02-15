exports = module.exports = function(IoC, gateways, logger) {
  var normalizePort = require('../lib/utils').normalizePort;
  
  
  // TODO: Dynamically create the Application object, and if it is not available,
  //       fallback to loading an internal one, which automatically `use`s
  //       all available services.
  //       ie, it will automatically put the /oauth and /oauth/mfa etc services
  //       in place
  
  // http://i.bixbyjs.org/http/Service
  
  return Promise.resolve(IoC.create('service'))
    .catch(function(err) {
      // TODO: Check that the error is failure to create app/service
      return IoC.create('./service');
      throw err;
    })
    .then(function(service) {
      var gatewayIfaces = IoC.components(gateways());
    
      return Promise.all(gatewayIfaces.map(function(iface) { return iface.create(); } ))
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
