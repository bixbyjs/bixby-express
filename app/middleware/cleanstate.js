exports = module.exports = function(store) {
  
  return function(options) {
    options = options || {};
    options.store = store;
    
    return require('flowstate').clean(options);
  };
};

exports['@implements'] = [
  'http://i.bixbyjs.org/http/middleware/cleanState'
];
exports['@require'] = [
  '../state/store'
];
