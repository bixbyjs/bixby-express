/**
 * In-memory HTTP session store.
 *
 */
exports = module.exports = function() {
  var MemoryStore = require('express-session').MemoryStore;
  
  return new MemoryStore();
};

exports['@singleton'] = true;
