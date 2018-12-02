exports = module.exports = function() {
  var session = require('express-session');
  var RedisStore = require('connect-redis')(session);
  
  var store = new RedisStore({ url: 'redis://redis' });
  return store;
}

exports['@implements'] = 'http://i.bixbyjs.org/http/session/Store';
exports['@protocol'] = 'redis';
exports['@require'] = [
];
