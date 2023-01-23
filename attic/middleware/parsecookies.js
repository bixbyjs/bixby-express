exports = module.exports = function(vault) {
  
  return new Promise(function(resolve, reject) {
    // NOTE: secret will be shared between this and express-session, due to same hostname
    vault.get(function(err, secret) {
      if (err) { return reject(err); }
      if (!secret) { return reject(new Error('Secret to sign and verify cookies not found')); }
      
      resolve(function() {
        return require('cookie-parser')(secret);
      });
    });
    
  }); // new Promise
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/parseCookies';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/security/credentials/SecretVault'
];
