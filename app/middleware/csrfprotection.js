exports = module.exports = function(store, session, parseCookies) {
  
  // https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)
  // https://www.owasp.org/index.php/Cross-Site_Request_Forgery_(CSRF)_Prevention_Cheat_Sheet
  // https://en.wikipedia.org/wiki/Cross-site_request_forgery
  
  return function() {
    //var opts = {
      //cookie: true
      //cookie: { signed: true }
    //};
    
    var opts = {};
    if (!store) { opts.cookie = true; }
    
    return [
      store ? session() : parseCookies(),
      require('csurf')(opts)
    ];
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/csrfProtection';
exports['@singleton'] = true;
exports['@require'] = [
  '../session/store',
  'http://i.bixbyjs.org/http/middleware/session',
  'http://i.bixbyjs.org/http/middleware/parseCookies'
];
