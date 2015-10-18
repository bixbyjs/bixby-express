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
    IoC.use(exports);
  }
  
  function post(IoC) {
    var server = IoC.create('http/server');
    var service = IoC.create('service');
    var logger = IoC.create('logger');
    
    var init = IoC.create('initializer');
    init.phase(require('bootable').di.routes('app/routes'), service);
    init.phase(require('./phases/listen')(service, server, logger));
    
    try {
      // If service discovery is available, add a phase to announce the
      // service(s) provided by the application.
      var registry = IoC.create('sd/registry');
      init.phase(require('./phases/announce')(registry, server, logger));
    } catch (_) {}
  }
  
  require('bixby').main(pre, post);
}
