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
    
    var init = IoC.create('initializer');
    init.phase(require('bootable').di.routes('app/routes'), service);
    // TODO: Create this phase via IoC
    init.phase(require('./init.d/listen')(server, service));
  }
  
  require('bixby').main(pre, post);
}
