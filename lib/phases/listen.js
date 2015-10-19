module.exports = function(service, server, logger) {
  
  return function listen() {
    // Dispatch requests to the handler, which in this case is an Express app.
    server.on('request', service);
    
    server.once('listening', function() {
      var addr = this.address();
      logger.info('HTTP server listening on %s:%d', addr.address, addr.port);
    });
    
    // TODO: Don't bind to localhost by default.
    server.listen(8080, '127.0.0.1');
  };
};
