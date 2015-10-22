exports = module.exports = function express(id) {
  var map = {
    'service': './service',
    'authenticator': './authenticator',
    'boot/httpserver': './boot/httpserver'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};



exports.main = function() {
  function pre(IoC) {
    IoC.use('http', require('bixby-http'));
    IoC.use('http', exports);
  }
  
  function post(IoC) {
    var service = IoC.create('http/service');
    var server = IoC.create('http/server');
    var logger = IoC.create('logger');
    var settings = IoC.create('settings');
    
    // Dispatch requests to the handler, which in this case is an Express app.
    server.on('request', service);
    
    var init = IoC.create('initializer');
    init.phase(require('./phases/listen')(service, server, logger));
    
    try {
      // If service discovery is available, add a phase to announce the
      // service(s) provided by the application.
      var registry = IoC.create('sd/registry');
      init.phase(require('./phases/announce')(registry, server, logger, settings.get('http/service')));
    } catch (_) {}
  }
  
  require('bixby').main(pre, post);
}
