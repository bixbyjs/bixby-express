exports = module.exports = function(IoC, gateways, service, settings, logger) {
  var normalizePort = require('../lib/utils').normalizePort;
  
  
  // TODO: Dynamically create the Application object, and if it is not available,
  //       fallback to loading an internal one, which automatically `use`s
  //       all available services.
  //       ie, it will automatically put the /oauth and /oauth/mfa etc services
  //       in place
  
  return Promise.resolve()
    /*
    .then(IoC.create.bind(IoC, './routes'))
    .then(function(routes) {
      routes.apply(service);
    })
    .catch(function(err) {
      // FIXME: Test for error code
      if (err.message.indexOf('Unable to create') == 0) {
        return;
      }
      throw err;
    })
    */
    .then(function() {
      var gatewayIfaces = IoC.components(gateways());
    
      return Promise.all(gatewayIfaces.map(function(iface) { return iface.create(); } ))
        .then(function(gateways) {
          gateways.forEach(function(gateway, i) {
            // Dispatch requests to the service, which in this case is an Express app.
            gateway.on('request', service);
          });
        });
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './gateways',
  'http://i.bixbyjs.org/http/Service',
  'http://i.bixbyjs.org/Settings',
  'http://i.bixbyjs.org/Logger'
];
