exports = module.exports = function(C, logger) {
  
  return C.create('http://i.bixbyjs.org/http/SessionStore')
    .catch(function(error) {
      if (error.code == 'IMPLEMENTATION_NOT_FOUND' && error.interface == 'http://i.bixbyjs.org/http/SessionStore'
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
