exports = module.exports = function() {
  var flowstate = require('flowstate');
  
  var store = new flowstate.SessionStore();
  return store;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/flows/StateStore';
exports['@singleton'] = true;
