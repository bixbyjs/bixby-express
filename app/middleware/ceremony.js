exports = module.exports = function(dispatcher) {
  
  return function() {
    return dispatcher.flow.apply(dispatcher, arguments);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/ceremony';
exports['@require'] = [
  '../state/dispatcher'
];
