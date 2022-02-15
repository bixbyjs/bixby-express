/**
 * HTTP session middleware.
 *
 */
exports = module.exports = function(store, vault) {
  
  return new Promise(function(resolve, reject) {
    vault.get(function(err, secret) {
      if (err) { return reject(err); }
      if (!secret) { return reject(new Error('Secret to sign and verify session ID cookie not found')); }
  
      // TODO: set `name` to `sid`
      // TODO: Detect env and set `proxy` options? (or just leave undefined and defer to express, probably best)
      // TODO: see if store implements `touch`, and set resave to `true`, if not
      var opts = {
        secret: secret,
        store: store,
        resave: false,
        saveUninitialized: false
      };
      
      resolve(function() {
        return require('express-session')(opts);
      });
    });
  });
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/session';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  '../session/store',
  'http://i.bixbyjs.org/security/credentials/SecretVault'
];
