exports = module.exports = function() {
  
  return function() {
    return require('cookie-parser')();
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/parseCookies';
