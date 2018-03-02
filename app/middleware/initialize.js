exports = module.exports = function() {
  
  return function() {
    return function(req, res, next) {
      req.locals = req.locals || {};
      next();
    };
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/initialize';
