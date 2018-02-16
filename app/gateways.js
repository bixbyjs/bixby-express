exports = module.exports = function(IoC, dfault) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  return Promise.resolve(factory)
    .then(function(factory) {
      var giComponents = IoC.components('http://i.bixbyjs.org/platform/http/GatewayInterface');
  
      return Promise.all(giComponents.map(function(comp) { return comp.create(); } ))
        .then(function(ifaces) {
          ifaces.forEach(function(iface, i) {
            logger.info('Loaded HTTP gateway interface: ' + giComponents[i].a['@name']);
            factory.use(iface);
          });
          
          factory.use(dfault);
        })
        .then(function() {
          return factory;
        });
    })
    .then(function(factory) {
      return function() {
        var rv = factory.create();
        return Array.isArray(rv) ? rv : [ rv ];
      }
    });
};

exports['@require'] = [ '!container', './gateways/default' ];
