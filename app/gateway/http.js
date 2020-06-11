exports = module.exports = function(IoC) {
  
  return IoC.create('http://i.bixbyjs.org/http/Server')
    .then(function(server) {
      
      return {
        listen: function(cb) {
          // --http-server-address --http-server-port
          // settings.get('http/server/address');
          //console.log(settings.toObject());
          //console.log(settings.get('http'));
          
          server.once('listening', function() {
            //var addr = this.address();
            //logger.info('HTTP server listening on %s:%d', addr.address, addr.port);
            
            cb && cb.apply(this);
          });
          
          //var options = settings.get('http/server') || {};
          var options = {};
          var address = options.address;
          //var port = options.port !== undefined ? options.port : normalizePort(process.env.PORT || 8080);
          var port = 8080;
          
          server.listen(port, address);
        },
        
        address: server.address.bind(server),
        on: server.on.bind(server)
      }
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Gateway';
exports['@require'] = [ '!container' ];
