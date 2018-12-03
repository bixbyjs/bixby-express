exports = module.exports = function(IoC, logger) {
  var uri = require('url');
  
  return Promise.resolve()
    .then(function discoverService() {
      var components = IoC.components('http://i.bixbyjs.org/http/session/StoreDiscoverFunc');
  
      return Promise.all(components.map(function(c) { return c.create(); } ))
        .then(function(funcs) {
          return new Promise(function(resolve, reject) {
            
            // Iterate over each of the `discover` functions, attempting to
            // locate a service capable of storing HTTP sessions.
            (function iter(i) {
              var func = funcs[i];
              if (!func) {
                // Reject with `ENOTFOUND`, causing a jump to the next catch
                // function.  This function will attempt to create a suitable
                // store based on the host environment.
                return reject('ENOTFOUND');
              }
          
              logger.debug('Discovering HTTP session store via ' + components[i].a['@service']);
              func(function(err, records, ctx) {
                if (err && err.code == 'ENOTFOUND') {
                  // Unable to locate a service using this particular protocol.
                  // Continue discovery using remaining supported protocols.
                  return iter(i + 1);
                } else if (err) {
                  return reject(err);
                }
                
                if (!records) { return iter(i + 1); }
                return resolve([records, ctx]);
              });
            })(0);
            
          });
        });
    })
    .then(function createStore(args) {
      var records = args[0]
        , ctx = args[1] || {};
      
      // Iterate over the available components that support the HTTP session
      // store interface, and create one that is compatible with the protocol
      // found via service discovery.
      var components = IoC.components('http://i.bixbyjs.org/http/session/Store')
        , rec = records[0]
        , component, i, len
        , url, scheme;
      
      for (i = 0, len = components.length; i < len; ++i) {
        component = components[i];
        if (component.a['@service'] == ctx.service && component.a['@protocol'] == ctx.protocol) {
          logger.debug('Connecting to HTTP session store via ' + ctx.service);

          if (rec.url) {
            url = uri.parse(rec.url);
            scheme = url.protocol.slice(0, -1);
            if (component.a['@uri-scheme'] == scheme) {
              return component.create({ url: rec.url });
            }
          }
        }
      }
      
      // TODO: Throw an error.
    })
    .catch(function createDevelopmentStoreIfOK(err) {
      if (err !== 'ENOTFOUND') { throw err; }
      if (process.env.NODE_ENV !== 'development') {
        // TODO: augment this error with supported protocols, for auto-configuration
        throw new Error('Unable to create HTTP session store');
      }
      
      logger.notice('Using in-memory HTTP session store for development');
      return IoC.create('./store/memory');
    });
};

//exports['@implements'] = 'http://i.bixbyjs.org/http/session/Store';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
