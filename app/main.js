/**
 * Main script.
 *
 * This component provides a main script for an HTTP application.
 *
 * This package provides a default service component which uses the [Express][1]
 * framework.  It is expected that most applications will utilize this component,
 * as it eliminates the boilerplate typically found in most Express apps.
 *
 * However, the main script will preferrentially load an application-provided
 * component (at `app/app`), for applications that wish to override the standard
 * boilerplate or use an alternative framework.  This component is expected to
 * provide a function which handles HTTP requests, as defined by Node.js' HTTP
 * [`request` event][2].  For example:
 *
 *     function(req, res) {
 *       res.statusCode = 200;
 *       res.setHeader('Content-Type', 'text/plain');
 *       res.end('Hello World');
 *     }
 *
 * Once the service is created, the gateway between the application and the
 * World Wide Web (WWW) will be instantiated, and requests received will be
 * dispatched to the service for handling.
 *
 * [1]: https://expressjs.com/
 * [2]: https://nodejs.org/api/http.html#http_event_request
 */
exports = module.exports = function(IoC, logger) {
  
  return IoC.create('app/app', { metadata: true })
    .then(function(service) {
      // The application-specific service component is annotated with a path at
      // which it it should be mounted.  Create the default service component,
      // which will mount the application-provided service, as well as eliminate
      // boilerplate in the application itself.
      
      if (service[1].implements.indexOf('http://i.bixbyjs.org/http/Service') != -1) {
        return IoC.create('./service');
      }
      
      return service[0];
    }, function(err) {
      // No application-specific service component is provided.  Create the
      // default service component, which uses Express and eliminates common
      // boilerplate.
      if (err.code == 'IMPLEMENTATION_NOT_FOUND' && err.interface == 'app/app') {
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
