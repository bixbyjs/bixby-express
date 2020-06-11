/**
 * Main script.
 *
 * This component provides a main script that handles HTTP requests using the
 * Express framework.
 *
 * This package provides a default service component which eliminates the
 * boilerplate typically used in most applications.  It is expected that most
 * applications will take advantage of this capability.  However, the main
 * script will preferrentially load an app-specific component, accomodating
 * applications that need to override the standard boilerplate.
 *
 * Once the service is created....
 */
exports = module.exports = function(IoC, logger) {
  
  return IoC.create('app/service')
    .catch(function(err) {
      // TODO: Check that the error is failure to create app/service
      return IoC.create('./service');
      throw err;
    })
    .then(function(service) {
      return IoC.create('./gateway')
        .then(function(gateways) {
          
          
          // TODO: Implement a way to return the annotations, so those
          //       can be used to drive service discovery.
          gateways.forEach(function(gateway, i) {
            // Dispatch requests to the service, which in this case is an
            // Express app.
            
            gateway.listen(function(err) {
              // TODO: log it
              // TODO: service discovery announce
            });
            
            gateway.on('request', service);
          });
        });
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/main';
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
