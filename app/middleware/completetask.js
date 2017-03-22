exports = module.exports = function(dispatcher) {
  
  return function(name, options) {
    options = options || {};
    options.name = name;
    
    return dispatcher.complete(options);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/completeTask';
exports['@require'] = [
  'http://i.bixbyjs.org/http/state/Dispatcher'
];
