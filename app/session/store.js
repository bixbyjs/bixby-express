/**
 * HTTP session store.
 *
 */
exports = module.exports = function(C, logger) {
  
  return C.create('module:express-session.Store')
    .catch(function(error) {
      if (error.code == 'IMPLEMENTATION_NOT_FOUND' && error.interface == 'module:express-session.Store'
          && process.env.NODE_ENV == 'development') {
        logger.notice('Using in-memory HTTP session store during development');
        return C.create('./store/memory');
      }
      
      throw error;
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
