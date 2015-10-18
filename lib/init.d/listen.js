module.exports = function(server, handler) {
  
  return function listen() {
    // Dispatch requests to the handler, which in this case is an Express app.
    server.on('request', handler);
    
    server.listen(8080);
  };
};
