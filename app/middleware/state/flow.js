exports = module.exports = function(dispatcher) {
  
  return function() {
    return dispatcher.flow.apply(dispatcher, arguments);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/state/flow';
exports['@require'] = [
  '../../state/dispatcher'
];
