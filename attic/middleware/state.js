exports = module.exports = function(store) {
  
  return function(options) {
    options = options || {};
    options.store = store;
    
    return require('flowstate')(options);
  };
};

// TODO: remove ceremony naming, rename to state
exports['@implements'] = [
  'http://i.bixbyjs.org/http/middleware/state'
];
exports['@require'] = [
  'module:flowstate.Store'
];
