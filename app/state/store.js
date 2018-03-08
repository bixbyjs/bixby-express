exports = module.exports = function(IoC, session) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  function create(provider) {
    return function(options) {
      if (provider.canCreate(options)) {
        return provider.create(options);
      }
    };
  }
  
  return Promise.resolve(factory)
    .then(function(factory) {
      var components = IoC.components('http://i.bixbyjs.org/http/state/StoreProvider');
      
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(providers) {
          providers.forEach(function(provider, i) {
            logger.info('Loaded HTTP state store provider: ' + components[i].a['@name']);
            factory.use(create(provider));
          });
          
          factory.use(create(session));
        })
        .then(function() {
          return factory;
        });
    })
    .then(function(factory) {
      return factory.create();
    })
    .then(function(store) {
      return store;
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/http/workflow/StateStore';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './store/session',
];
