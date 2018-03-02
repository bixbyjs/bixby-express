exports = module.exports = function(dispatcher) {
  
  return function(name, options) {
    options = options || {};
    options.name = name;
    
    return dispatcher.completeError(options);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/failTask';
exports['@require'] = [
  'http://i.bixbyjs.org/http/state/Dispatcher'
];
