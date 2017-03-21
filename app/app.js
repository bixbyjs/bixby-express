exports = module.exports = function(IoC, service, settings, logger) {
  
  // TODO: Make this adaptable to the runtime environment (CGI, Lambda, etc)
  
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
    .then(function() { return IoC.create('http://i.bixbyjs.org/http/Server'); })
    .then(function(server) {
      server.on('request', service);
  
      server.once('listening', function() {
        var addr = this.address();
        logger.info('HTTP server listening on %s:%d', addr.address, addr.port);
      });
      
      var opts = settings.get('http/server') || {};
    
      var address = opts.address;
      var port = opts.port !== undefined ? opts.port : 8080;
      server.listen(port, address);
    });
  
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './service', // 'http://i.bixbyjs.org/http/Service',
  'http://i.bixbyjs.org/Settings',
  'http://i.bixbyjs.org/Logger'
];