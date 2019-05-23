exports = module.exports = function(store, keyring) {
  
  return new Promise(function(resolve, reject) {
    var hostname = 'www';
  
    keyring.get(hostname, function(err, cred) {
      if (err) { return reject(err); }
      if (!cred) { return reject(new Error("Cannot find credentials for '" + hostname + "'")); }
  
      // TODO: set `name` to `sid`
      // TODO: Detect env and set `proxy` options? (or just leave undefined and defer to express, probably best)
      // TODO: see if store implements `touch`, and set resave to `true`, if not
      var opts = {
        secret: cred.password,
        store: store,
        resave: false,
        saveUninitialized: false
      };
      
      resolve(function() {
        return require('express-session')(opts);
      });
    });
    
  }); // new Promise
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/session';
exports['@singleton'] = true;
exports['@require'] = [
  '../session/store',
  'http://i.bixbyjs.org/security/CredentialsStore'
];
