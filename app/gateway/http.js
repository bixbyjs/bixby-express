function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
};

/**
 * HTTP gateway.
 *
 * This component provides a gateway that utilizes HTTP as a communication
 * protocol.
 */
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
            cb && cb.apply(this);
          });
          
          //var options = settings.get('http/server') || {};
          var options = {};
          var address = options.address;
          var port = options.port !== undefined ? options.port : normalizePort(process.env.PORT || 8080);
          
          server.listen(port, address);
        },
        
        address: server.address.bind(server),
        on: server.on.bind(server)
      }
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/http/Gateway';
exports['@require'] = [ '!container' ];
