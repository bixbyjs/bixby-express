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
 * Once the service is created, the gateway between the application and the
 * World Wide Web (WWW) will be instantiated, and requests received will be
 * dispatched to the application.
 */
exports = module.exports = function(IoC, logger) {
  
  return IoC.create('app/service', { meta: true })
    .then(function(service) {
      // The application-specific service component is annotated with a path at
      // which it it should be mounted.  Create the default service component,
      // which will mount the application-provided service, as well as eliminate
      // boilerplate in the application itself.
      if (service[1].implements.indexOf('http://i.bixbyjs.org/http/Service') != -1
          && service[1].a['@path']) {
        return IoC.create('./service');
      }
      
      return service[0];
    }, function(err) {
      // No application-specific service component is provided.  Create the
      // default service component, which eliminates boilerplate in the
      // application itself.
      if (err.code == 'IMPLEMENTATION_NOT_FOUND' && err.interface == 'app/service') {
        return IoC.create('./service');
      }
      
      throw err;
    })
    .then(function(service) {
      return IoC.create('./gateways')
        .then(function(gateways) {
          // TODO: Implement a way to extend the express app so that it
          //       can map between paths and service names, and used to
          //       announce service in a service registry.
          gateways.forEach(function(gateway) {
            // Dispatch requests to the service, which in this case is an
            // Express app.
            gateway.on('request', service);
            
            // TODO: Remove err from callback signature, and hook up error event
            gateway.listen(function(err) {
              // TODO: service discovery announce
              var addr = this.address();
              logger.info('HTTP server listening on %s:%d', addr.address, addr.port);
            });
          });
        });
    });
};

exports['@implements'] = 'http://i.bixbyjs.org/main';
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
