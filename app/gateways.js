exports = module.exports = function(IoC, dfault) {
  var Factory = require('fluidfactory');
  
  
  var factory = new Factory();
  
  return Promise.resolve(factory)
    .then(function(factory) {
      var detectorPlugIns = IoC.components('http://i.bixbyjs.org/platform/http/gatewayDetector');
  
      return Promise.all(detectorPlugIns.map(function(plugin) { return plugin.create(); } ))
        .then(function(plugins) {
          plugins.forEach(function(plugin, i) {
            logger.info('Loaded HTTP gateway detector: ' + detectorPlugIns[i].a['@name']);
            factory.use(plugin);
          });
          
          factory.use(dfault);
        })
        .then(function() {
          return factory;
        });
    })
    .then(function(factory) {
      return function() {
        var ifaces = factory.create();
        if (typeof ifaces == 'string') {
          return [ ifaces ];
        }
        return ifaces;
      }
    });
};

exports['@require'] = [ '!container', './gateways/default' ];
