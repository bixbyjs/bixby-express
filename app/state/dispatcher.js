exports = module.exports = function(IoC, store, logger) {
  var flowstate = require('flowstate');
  
  
  var dispatcher = new flowstate.Manager(store);
  
  return Promise.resolve(dispatcher)
    .then(function(dispatcher) {
      var components = IoC.components('http://i.bixbyjs.org/http/state/Prompt');
    
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(prompts) {
          prompts.forEach(function(prompt, i) {
            var name = components[i].a['@name'];
            logger.info('Loaded HTTP prompt: ' + name);
            dispatcher.use(name, prompt.begin, prompt.resume);
          });
        })
        .then(function() {
          return dispatcher;
        });
    })
    .then(function(dispatcher) {
      var components = IoC.components('http://i.bixbyjs.org/http/state/yielder');
    
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(yielders) {
          yielders.forEach(function(yielder, i) {
            var resume = components[i].a['@resume']
              , result = components[i].a['@result']
            logger.info("Loaded HTTP yielder from '" + result + "' to '" + resume +  "'");
            dispatcher.transition(resume, result, yielder);
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
