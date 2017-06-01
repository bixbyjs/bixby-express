exports.normalizePort = function(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    return false;
  }

  if (port >= 0) {
    return port;
  }

  return false;
};
