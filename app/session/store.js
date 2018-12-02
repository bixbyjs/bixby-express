exports = module.exports = function(IoC, logger) {
  var uri = require('url');
  
  return Promise.resolve()
    .then(function discoverService() {
      var components = IoC.components('http://i.bixbyjs.org/http/session/StoreServiceDiscoverFunc');
  
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
          
              logger.debug('Discovering HTTP session service via ' + components[i].a['@type']);
              func(function(err, records) {
                if (err && err.code == 'ENOTFOUND') {
                  // Unable to locate a service of this particular type.
                  // Continue discovery using remaining supported service types.
                  return iter(i + 1);
                } else if (err) {
                  return reject(err);
                }
                
                if (!records) { return iter(i + 1); }
                return resolve(records);
              });
            })(0);
            
          });
        });
    })
    .then(function createStore(records) {
      
      
      /*
      if (!records) {
        // TODO: Only when NODE_ENV is set to development
        return IoC.create('./store/memory');
      }
      */
      
      var record = records[0];
      var url = uri.parse(record.url);
      var protocol = url.protocol.slice(0, -1);
      
      
      var components = IoC.components('http://i.bixbyjs.org/http/session/Store')
        , component, i, len;
      
      for (i = 0, len = components.length; i < len; ++i) {
        component = components[i];
        if (component.a['@protocol'] == protocol) {
          return component.create({ url: record.url });
        }
      }
    })
    .catch(function createDevelopmentStoreIfOK(err) {
      if (err !== 'ENOTFOUND') { throw err; }
      if (process.env.NODE_ENV !== 'development') {
        // TODO: augment this error with supported protocols, for auto-configuration
        throw new Error('Unable to create HTTP session store');
      }
      
      return IoC.create('./store/memory');
    });
};

//exports['@implements'] = 'http://i.bixbyjs.org/http/session/Store';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
