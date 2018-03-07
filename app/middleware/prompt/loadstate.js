exports = module.exports = function(dispatcher) {
  
  return function(name, options) {
    options = options || {};
    options.name = name;
    
    return dispatcher.loadState(options);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/loadState';
exports['@require'] = [
  '../../prompt/dispatcher'
];
