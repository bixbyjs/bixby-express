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
 * This component provides a gateway that implements HTTP as a communication
 * protocol.
 *
 * If no other gateways are provided by available packages, this gateway will
 * be used by default.  In a development environment, the HTTP server will
 * receive requests directly.  However, in production environments, the HTTP
 * server will be mediated by an HTTP proxy (such as Apache or nginx) which
 * forwards requests from the World Wide Web (WWW) upstream to the application.
 */
exports = module.exports = function(IoC) {
  
  return IoC.create('module:http.Server')
    .then(function(server) {
      //console.log(server)
      
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
          // NOTE: 8080 is the default port expected by heroku, fly.io, etc
          // https://fly.io/docs/reference/configuration/
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
