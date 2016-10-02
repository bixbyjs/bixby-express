exports = module.exports = function(__app__, service, server, settings, logger) {
  
  // Dispatch requests to the handler, which in this case is an Express app.
  server.on('request', service);
  
  server.once('listening', function() {
    var addr = this.address();
    logger.info('HTTP server listening on %s:%d', addr.address, addr.port);
  });
  
  
  return function main() {
    var opts = settings.get('http/server') || {};
    
    var address = opts.address;
    var port = opts.port !== undefined ? opts.port : 8080;
    server.listen(port, address);
  };
};

exports['@singleton'] = true;
exports['@require'] = [
  'app',
  'http/service',
  'http/server',
  'settings',
  'logger'
];
