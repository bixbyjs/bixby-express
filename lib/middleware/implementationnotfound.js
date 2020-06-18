module.exports = function implementationNotFound(err) {
  
  return function(req, res, next) {
    // WIP: make a developer error handler that prints the info to the dev when they access this route
    // TODO: Set HTTP status code, render pretty HTML
    return res.send(err.message);
  };
};
