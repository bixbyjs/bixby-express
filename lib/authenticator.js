exports = module.exports = function(container) {
  var passport = require('passport');
  
  var authenticator = new passport.Authenticator();
  
  //console.log('HERE IS THE SPEC TABLE:');
  // TODO: There's a lot of duplicated stuff in these records, clean it up
  //console.log(container.specs())
  
  var specs = container.specs()
    , spec, provides
    , i, len;
  for (i = 0, len = specs.length; i < len; ++i) {
    spec = specs[i];
    provides = spec.a['@provides'] || [];
    if (typeof provides == 'string') {
      provides = [ provides ];
    }
    if (provides.indexOf('http://i.bixbyjs.org/http/authentication/Scheme') !== -1) {
      // This specification declares an HTTP authentication scheme.  Create the
      // scheme and use it as a plugin to the Passport `Authenticator`.
      var scheme = container.create(spec.id);
      authenticator.use(spec.a['@name'] || scheme.name, scheme);
    }
  }
  
  return authenticator;
}


exports['@provides'] = 'http://i.bixbyjs.org/express/Authenticator';
// TODO: Require by interface
exports['@require'] = [ '$container' ];
exports['@singleton'] = true;

