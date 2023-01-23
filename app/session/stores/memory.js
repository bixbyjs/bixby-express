var MemoryStore = require('express-session').MemoryStore;

/**
 * In-memory HTTP session store.
 *
 */
exports = module.exports = function() {
  return new MemoryStore();
};

exports['@singleton'] = true;
exports['@implements'] = 'module:express-session.Store';
exports['@environment'] = 'development';
