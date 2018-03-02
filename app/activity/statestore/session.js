exports = module.exports = function() {
  
  return function createSessionStore() {
    var flowstate = require('flowstate');
  
    var store = new flowstate.SessionStore();
    return store;
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/workflow/createStateStoreImpl';
