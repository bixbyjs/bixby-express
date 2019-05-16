exports = module.exports = function(IoC, connect, logger) {
  var uri = require('url');
  
  
  var promise = new Promise(function(resolve, reject) {
    // TODO: Introspect container for session service types.
    var type = 'sess-redis';
    
    connect([ type ], function(err, conn) {
      if (err) { reject(err); }
      resolve(conn);
    });
  });
  
  return promise
    .catch(function(err) {
      if (err.code !== 'ENOTFOUND') { throw err; }
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
  'http://i.bixbyjs.org/ns/connect',
  'http://i.bixbyjs.org/Logger'
];
