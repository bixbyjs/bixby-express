exports = module.exports = function(dispatcher) {
  
  return function(name) {
    return dispatcher.loadState(name);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/loadState';
exports['@require'] = [
  'http://i.bixbyjs.org/http/state/Dispatcher'
];
