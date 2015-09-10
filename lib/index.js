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
  console.log('bixby express main!');
  
  // TODO: clean this up
  function pre(IoC) {
    console.log('PRE RUN!');
    
    IoC.use('http', require('bixby-http'));
    IoC.use(exports);
  }
  
  // TODO: clean this up
  function post(IoC) {
    console.log('POST!');
    
    var server = IoC.create('http/server');
    var handler = IoC.create('service'); 
    server.on('request', handler);
    
    server.listen(8080);
  }
  
  require('bixby').main(pre, post);
}