exports = module.exports = function(IoC, store) {
  
  // FIXME: Load this dynmaicaly
  var SECRET = 'keyboard-cat';
  
  return function() {
    return require('express-session')({ secret: SECRET, store: store });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/session';
exports['@require'] = [
  '!container',
  '../session/store'
];
