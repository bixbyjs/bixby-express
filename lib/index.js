exports = module.exports = {
  'authenticator': require('./authenticator')
};

exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};



exports.main = function(pre) {
  function _pre(IoC) {
    IoC.use(require('../app'));
    IoC.use('http', require('bixby-http'));
    IoC.use('http', exports);
    pre && pre(IoC);
  }
  
  require('bixby').main(_pre);
}
