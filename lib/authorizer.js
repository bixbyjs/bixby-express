exports = module.exports = function(container) {
  // Load modules.
  var visa = require('visa');
  
  
  var authorizer = new visa.Authorizer();
  return authorizer;
}

exports['@singleton'] = true;
exports['@require'] = [ '!container' ];
exports['@implements'] = 'http://i.bixbyjs.org/http/Authorizer';
