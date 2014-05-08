module.exports = function express(id) {
  var map = {
    'boot/httpserver': './boot/httpserver'
  };
  
  var mid = map[id];
  if (mid) {
    return require(mid);
  }
};
