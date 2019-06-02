exports = module.exports = function(keyring) {
  var Keygrip = require('keygrip');
  
  
  return new Promise(function(resolve, reject) {
    var hostname = 'www';
  
    keyring.get(hostname, function(err, cred) {
      if (err) { return reject(err); }
      if (!cred) { return reject(new Error("Cannot find credentials for '" + hostname + "'")); }
      
      var keys = [ cred.password ];
      
      // TODO: set name option to "session"
      var opts = {
        //keys: new Keygrip(keys, 'sha256')
        keys: new Keygrip(keys, 'sha1')
      };
      
      resolve(function() {
        return require('cookie-session')(opts);
      });
    });
    
  }); // new Promise
};

exports['@require'] = [
  'http://i.bixbyjs.org/security/CredentialsStore'
];
