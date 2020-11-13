exports = module.exports = function(IoC, logger) {
  
  return IoC.create('http://i.bixbyjs.org/http/SessionStore')
    .catch(function(err) {
      console.log(err);
      
      //if (err.code !== 'ENOTFOUND') { throw err; }
      if (process.env.NODE_ENV !== 'development') {
        // TODO: Consider using a cookie-based store here, for stateless sessions
        //throw err;
        return null;
      }
      
      logger.notice('Using in-memory HTTP session store for development');
      return IoC.create('./store/memory');
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/Logger'
];
