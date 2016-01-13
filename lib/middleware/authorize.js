exports = module.exports = function(authorizer, settings) {
  // Load modules.
  var visa = require('visa');
  
  return visa.middleware.authorize(authorizer);
}

exports['@require'] = [ 'http://i.expressjs.com/Authorizer', '$settings' ];
exports['@implements'] = 'http://i.expressjs.com/middleware/authorize';
