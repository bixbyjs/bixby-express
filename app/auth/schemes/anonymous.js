// Module dependencies.
var AnonymousStrategy = require('passport-anonymous').Strategy;

/**
 * Create anonymous authentication scheme.
 *
 * Returns an authentication scheme that does not authenticate requests.
 *
 * @returns {passport.Strategy}
 */
exports = module.exports = function() {
  return new AnonymousStrategy();
};

// Module annotations.
exports['@singleton'] = true;
