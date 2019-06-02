exports = module.exports = function() {
  
  // https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
  // https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet
  // https://en.wikipedia.org/wiki/Cross-site_request_forgery
  
  return function(options) {
    return require('csurf')(options);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/csrfProtection';
exports['@singleton'] = true;
