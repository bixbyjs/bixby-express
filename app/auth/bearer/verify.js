exports = module.exports = function(authenticateToken, Tokens) {
  
  return function verify(req, token, cb) {
    
    Tokens.decipher(token, function(err, claims, issuer) {
      if (err) { return cb(err); }
      
      // TODO: Check confirmation methods, etc
      
      authenticateToken(claims.subject, issuer, function(err, user) {
        if (err) { return cb(err); }
        return cb(null, user);
      });
    });
  };
};

exports['@require'] = [
  'http://i.bixbyjs.org/security/authentication/token/authenticate',
  'http://i.bixbyjs.org/tokens'
];
