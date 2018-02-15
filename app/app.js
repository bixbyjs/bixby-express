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
            //console.log(gateway);
            //console.log(i);
            
            var server = gateway;
            
            // Dispatch requests to the service, which in this case is an Express app.
            server.on('request', service);
  
            server.once('listening', function() {
              var addr = this.address();
              logger.info('HTTP server listening on %s:%d', addr.address, addr.port);
            });
      
            var opts = settings.get('http/server') || {};
    
            var address = opts.address;
            var port = opts.port !== undefined ? opts.port : (normalizePort(process.env.PORT) || 8080);
      
            server.listen(port, address);
            
            
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
