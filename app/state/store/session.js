exports = module.exports = function() {
  var SessionStore = require('flowstate').SessionStore;
  
  return new SessionStore();
};

exports['@require'] = [];
