var session = require('express-session');
var RedisStore = require('connect-redis')(session);

/**
 * Redis session store.
 *
 * This component provides HTTP session storage using [Redis][1].
 *
 * The location of this service will be discovered by looking up the service
 * name `sess-resp`.  This name is derived from the default key prefix, `sess:`,
 * used by [`connect-redis`][2] suffixed by `-resp`, the application layer
 * [protocol][3] implemented by Redis, and thus used by this session store.
 *
 * Operationally, the list of sessions stored by Redis can be queried using
 * `redis-cli`:
 *
 *     $ redis-cli
 *     > KEYS sess:*
 *
 * Session data can be read by querying a session ID:
 *
 *     > GET sess:b_atMd5ftfIJ7YeBNeBUoH1pgl4KcErs
 *
 * [1]: https://redis.io/
 * [2]: https://github.com/tj/connect-redis
 * [3]: https://redis.io/topics/protocol
 */
exports = module.exports = function(redis, location) {
  var client = redis.createConnection(location);
  var store = new RedisStore({ client: client });
  return store;
};

exports['@singleton'] = true;
exports['@implements'] = 'module:express-session.Store';
exports['@service'] = 'sess-resp';
exports['@port'] = 6379;
exports['@require'] = [
  'http://i.bixbyjs.org/redis',
  '$location'
];
