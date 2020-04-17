exports = module.exports = function(IoC, store, keyring) {
  if (!store) {
    // no server side session store, use cookie sessions
    return IoC.create('./session/cookie');
  }
  
  return new Promise(function(resolve, reject) {
    
    keyring.get(function(err, cred) {
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
  '!container',
  '../session/store',
  'http://i.bixbyjs.org/security/Keyring'
];
