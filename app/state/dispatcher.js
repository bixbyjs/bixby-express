exports = module.exports = function(IoC, store, logger) {
  var flowstate = require('flowstate');
  
  
  var dispatcher = new flowstate.Manager(store);
  
  return Promise.resolve(dispatcher)
    .then(function(dispatcher) {
      // TODO: If any of these prompts have @requires that aren't satisfied, its an error.
      //       should it be a warning?
      
      console.log('CREATE PROMPTS!');
      return dispatcher;
      
      // TODO: Remove .use from flowstate
    })
    .then(function(dispatcher) {
      console.log('CREATE YIELDS!');
      return dispatcher;
      
      var components = IoC.components('http://i.bixbyjs.org/http/ceremony/Yield2');
    
      // TODO: remove .yield from flowstate
    })
    .then(function(dispatcher) {
      return dispatcher;
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/http/StateStore',
  'http://i.bixbyjs.org/Logger'
];
