exports = module.exports = function() {
  var MemoryStore = require('express-session').MemoryStore;
  
  return new MemoryStore();
};
