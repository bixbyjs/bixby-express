exports = module.exports = function(IoC, store, logger) {
  var flowstate = require('flowstate');
  
  
  var dispatcher = new flowstate.Manager(store);
  
  return Promise.resolve(dispatcher)
    .then(function(dispatcher) {
      var components = IoC.components('http://i.bixbyjs.org/http/state/Prompt');
    
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(plugins) {
          plugins.forEach(function(plugin, i) {
            var name = components[i].a['@name'];
            logger.info('Loaded HTTP prompt: ' + name);
            dispatcher.use(name, plugin.begin, plugin.resume);
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
  'http://i.bixbyjs.org/http/workflow/StateStore',
  'http://i.bixbyjs.org/Logger'
];
