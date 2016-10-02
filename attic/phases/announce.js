var uri = require('url');


// In main, via Promise.then/catch
/*
    try {
      // If service discovery is available, add a phase to announce the
      // service(s) provided by the application.
      //var registry = IoC.create('sd/registry');
      //init.phase(require('./phases/announce')(registry, server, logger, settings.get('http/service')));
    } catch (_) {}
*/


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
      if (err) {
        logger.error('Failed to announce %s service: %s', type, err.message);
        return;
      }
      logger.info('Announced %s service at %s', type, record);
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
