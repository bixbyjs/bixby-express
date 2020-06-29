/**
 * Cross Site Request Forgery (CSRF) protection middleware.
 *
 * This component provides middleware that protects against [CSRF][1].  CSRF is
 * an attack in which unauthorized actions are executed by a site to which a
 * user is currently authenticated.  CSRF targets state-changing requests, such
 * as updating an account or making a financial transaction.
 *
 * Web browsers include [credentials][2] associated with a domain, including
 * cookies, TLS client certificates, and username and password for HTTP
 * authentication, in any request to that domain.  CSRF attacks exploit this
 * property by tricking the victim into unknowingly submitting a forged request
 * to a site the victim has access to.  This request is initiated from a
 * different site under the control of the attacker, and typically involves
 * embedding an image, a link which the victim clicks, or form which the victim
 * submits.
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
    var cookie = true;
    
    var opts = {};
    if (cookie) { opts.cookie = true; }
    
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
