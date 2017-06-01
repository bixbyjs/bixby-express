exports = module.exports = function() {
  
  return function() {
    return require('morgan')('common');
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/logging';
