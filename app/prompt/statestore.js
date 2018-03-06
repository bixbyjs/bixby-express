exports = module.exports = function(container, session) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  var createImplComps = container.components('http://i.bixbyjs.org/http/workflow/createStateStoreImpl');
  return Promise.all(createImplComps.map(function(comp) { return comp.create(); } ))
    .then(function(impls) {
      impls.forEach(function(impl) {
        factory.use(impl);
      });
      
      factory.use(session);
    })
    .then(function() {
      return factory.create();
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/http/workflow/StateStore';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './statestore/session',
];