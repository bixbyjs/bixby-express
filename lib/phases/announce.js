module.exports = function(registry, server, logger) {
  var listening = false
    , ready = false;
  
  function announce() {
    // TODO: Implement this
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
