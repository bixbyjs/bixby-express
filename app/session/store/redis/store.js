exports = module.exports = function(url) {
  var session = require('express-session');
  var RedisStore = require('connect-redis')(session);
  
  var store = new RedisStore({ url: url });
  return store;
}

exports['@implements'] = 'http://i.bixbyjs.org/http/session/Store';
exports['@protocol'] = 'redis';
exports['@require'] = [
  ':url'
];
