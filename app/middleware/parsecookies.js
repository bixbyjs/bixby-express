exports = module.exports = function(keyring) {
  
  return new Promise(function(resolve, reject) {
    // NOTE: secret will be shared between this and express-session, due to same hostname
    keyring.get(function(err, cred) {
      if (err) { return reject(err); }
      if (!cred) { return reject(new Error("Cannot find credentials for '" + hostname + "'")); }
      
      var secret = cred.password;
      
      resolve(function() {
        return require('cookie-parser')(secret);
      });
    });
    
  }); // new Promise
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/parseCookies';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/security/Keyring'
];
