exports = module.exports = function(dispatcher) {
  
  return function() {
    return dispatcher.flow.apply(dispatcher, arguments);
  };
};

// TODO: rename this to ceremony
exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/state/flow';
exports['@require'] = [
  '../../state/dispatcher'
];
