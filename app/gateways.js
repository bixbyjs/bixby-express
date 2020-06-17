/**
 * WWW gateways.
 *
 * This component provides the gateways between the application and the World
 * Wide Web (WWW).
 *
 * A gateway receives requests which are dispatched to the application for
 * processing.  By default, this gateway will be an HTTP server which is
 * connected to directly in a development environment or located upstream from
 * an HTTP proxy in production environments.  However, depending on the hosting
 * infrastructure or configuration, the gateway may implement a protocol such as
 * CGI, FastCGI, or SCGI.
 *
 * This component introspects the application for any components that implement
 * the HTTP gateway interface and instantiates them.  Usually only a single
 * gateway will be utilized.  However, multiple gateways can be in use
 * simultanously, in infrastructures that support such functionality.
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
