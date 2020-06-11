/**
 * WWW gateways.
 *
 * This component provides the gateways between the application and the World
 * Wide Web (WWW).
 *
 * This component introspects the application for any components that implement
 * the HTTP gateway interface and instantiates them, in order to facilitate the
 * dispatching of requests to the application.
 *
 * Depending on the environment and available packages, the communication
 * protocol may be CGI, FastCGI, SCGI, or similar.  By default, and most
 * typically, the communication protocol will be HTTP itself.  In production
 * environments, the application will be upstream from an HTTP proxy which
 * forwards requests to the application via the gateway protocol.
 *
 * Usually only a single gateway interface will be utilized.  However, multiple
 * interfaces can be in use simultanously, in infrastructures that support such
 * functionality.
 */
exports = module.exports = function(IoC) {
  
  return new Promise(function(resolve, reject) {
    var components = IoC.components('http://i.bixbyjs.org/http/Gateway')
      , gateways = [];
    
    (function iter(i) {
      var component = components[i];
      if (!component) {
        if (gateways.length == 0) {
          // No gateways were instantiated, instatiate an HTTP gateway by
          // default.
          return resolve(Promise.all([ IoC.create('./gateway/http') ]));
        }
        
        return resolve(gateways);
      }
      
      component.create()
        .then(function(gateway) {
          gateways.push(gateway);
          iter(i + 1);
        }, function(err) {
          console.log('ERROR')
          console.log(err)
        });
    })(0);
  });
};

exports['@require'] = [ '!container' ];
