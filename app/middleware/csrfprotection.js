/**
 * Cross Site Request Forgery (CSRF) protection middleware.
 *
 * This component provides middleware that protects against [CSRF][1].  In a
 * CSRF attack, a malicious site instructs a victim's browser to send a request
 * to an honest site.  This request includes [credentials][2], such as cookies,
 * as if it were part of of the victim's interaction with the honest site.  This
 * attack disrupts the integrity of the victim's session, and targets state-
 * modifying requests such as updating an account or making a financial
 * transaction.
 *
 * OWASP provides detailed [information][3] about CSRF, as well as well as
 * [techniques][4] for prevention.
 *
 * [1]: https://en.wikipedia.org/wiki/Cross-site_request_forgery
 * [2]: https://fetch.spec.whatwg.org/#credentials
 * [3]: https://owasp.org/www-community/attacks/csrf
 * [4]: https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html
 */
exports = module.exports = function(session, parseCookies) {
  
  return function() {
    //var opts = {
      //cookie: true
      //cookie: { signed: true }
    //};
    
    // TODO: Make this a setting
    var cookie = false;
    
    var opts = {};
    if (cookie) { opts.cookie = true; }
    
    opts.value = function(req) {
      return (req.body && req.body.csrf_token) ||
        (req.query && req.query.csrf_token) ||
        (req.headers['csrf-token']) ||
        (req.headers['xsrf-token']) ||
        (req.headers['x-csrf-token']) ||
        (req.headers['x-xsrf-token']);
    };
    
    
    return [
      cookie ? parseCookies() : session(),
      require('csurf')(opts)
    ];
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/csrfProtection';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/session',
  'http://i.bixbyjs.org/http/middleware/parseCookies'
];
