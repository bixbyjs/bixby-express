var uri = require('url');


module.exports = function(registry, server, logger, options) {
  options = options || {};
  
  var listening = false
    , ready = false;
  
  function announce() {
    // TODO: Make this more generic
    
    var type = options.type;
    if (!type) { return; }
    
    var addr = server.address();
    var record = uri.format({ protocol: 'http', hostname: addr.address, port: addr.port, pathname: '/' });
    
    registry.announce(type, record, function(err) {
      logger.info('Announced %s service at %s', type, record);
      
      //console.log('ANNOUNCED!');
      //console.log(err);
      
      //if (err) { return aiter(err); }
      //return aiter();
    });
  }
  
  server.once('listening', function() {
    listening = true;
    if (listening && ready) {
      announce();
    }
  });
  
  registry.once('ready', function() {
    ready = true;
    if (listening && ready) {
      announce();
    }
  });
  
  return function noop() {};
};
