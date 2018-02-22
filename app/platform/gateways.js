exports = module.exports = function(IoC, dfault) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  return Promise.resolve(factory)
    .then(function(factory) {
      var components = IoC.components('http://i.bixbyjs.org/platform/http/GatewayInitializer');
  
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(initializers) {
          initializers.forEach(function(initializer, i) {
            logger.info('Loaded HTTP gateway initializer: ' + components[i].a['@name']);
            factory.use(initializer);
          });
          
          factory.use(dfault);
        })
        .then(function() {
          return factory;
        });
    })
    .then(function(factory) {
      var gateways = factory.create();
      if (!Array.isArray(gateways)) { gateways = [ gateways ]; }
      return Promise.all(gateways);
    });
};

exports['@require'] = [ '!container', './gateway/default' ];
