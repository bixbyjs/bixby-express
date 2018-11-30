exports = module.exports = function() {
  
  // FIXME: Load this dynmaicaly
  var SECRET = 'keyboard-cat';
  
  return function() {
    return require('express-session')({ secret: SECRET });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/session';
