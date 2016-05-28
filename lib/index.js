exports = module.exports = function express(id) {
  var map = {
    'service': './service',
    'authenticator': './authenticator',
    //'authorizer': './authorizer',
    //'middleware/authenticate': './middleware/authenticate',
    //'middleware/authorize': './middleware/authorize'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};

exports.used = function(container) {
  // Register specs so objects can be auto-wired by interface.
  container.add('authenticator');
  //container.register('authorizer');
  //container.register('middleware/authenticate');
  //container.register('middleware/authorize');
}




exports.main = function(pre) {
  function _pre(IoC) {
    IoC.use('http', require('bixby-http'));
    IoC.use('http', exports);
    pre && pre(IoC);
  }
  
  function _post(IoC) {
    var service = IoC.create('http/service');
    var server = IoC.create('http/server');
    var logger = IoC.create('logger');
    var settings = IoC.create('settings');
    
    // Dispatch requests to the handler, which in this case is an Express app.
    server.on('request', service);
    
    var init = IoC.create('initializer');
    init.phase(require('./phases/listen')(service, server, logger, settings.get('http/server')));
    
    try {
      // If service discovery is available, add a phase to announce the
      // service(s) provided by the application.
      var registry = IoC.create('sd/registry');
      init.phase(require('./phases/announce')(registry, server, logger, settings.get('http/service')));
    } catch (_) {}
  }
  
  require('bixby').main(_pre, _post);
}
