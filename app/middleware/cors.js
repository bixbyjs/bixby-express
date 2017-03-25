exports = module.exports = function() {
  
  return function(options) {
    return require('cors')(options);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/cors';
