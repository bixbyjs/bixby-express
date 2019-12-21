exports = module.exports = function(IoC, store, logger) {
  var flowstate = require('flowstate');
  
  
  var dispatcher = new flowstate.Manager(store);
  
  return Promise.resolve(dispatcher)
    .then(function(dispatcher) {
      // TODO: If any of these prompts have @requires that aren't satisfied, its an error.
      //       should it be a warning?
      
      console.log('CREATE PROMPTS!');
      //return dispatcher;
      
      var components = IoC.components('http://i.bixbyjs.org/http/ceremony/Prompt2');
    
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(prompts) {
          prompts.forEach(function(prompt, i) {
            var name = components[i].a['@name'];
            logger.info('Loaded HTTP ceremony prompt: ' + name);
            dispatcher.use(name, prompt);
          });
        })
        .then(function() {
          return dispatcher;
        });
    })
    .then(function(dispatcher) {
      console.log('CREATE YIELDS!');
      //return dispatcher;
      
      var components = IoC.components('http://i.bixbyjs.org/http/ceremony/Yield2');
    
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(yielders) {
          yielders.forEach(function(yielder, i) {
            var to = components[i].a['@state']
              , from = components[i].a['@result']
            logger.info("Loaded HTTP ceremony yield from '" + from + "' to '" + to +  "'");
            dispatcher.yield(to, from, yielder);
          });
        })
        .then(function() {
          return dispatcher;
        });
    })
    .then(function(dispatcher) {
      return dispatcher;
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/http/state/Store',
  'http://i.bixbyjs.org/Logger'
];
