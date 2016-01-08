module.exports = function(service, server, logger, options) {
  options = options || {};
  
  return function listen() {
    server.once('listening', function() {
      var addr = this.address();
      logger.info('HTTP server listening on %s:%d', addr.address, addr.port);
    });
    
    var address = options.address;
    var port = options.port !== undefined ? options.port : 8080;
    server.listen(port, address);
  };
};
