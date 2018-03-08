exports = module.exports = function() {
  var flowstate = require('flowstate');
  
  
  return {
    canCreate: function(options) {
      return true;
    },
    
    create: function(options) {
      var store = new flowstate.SessionStore();
      return store;
    }
  };
};

exports['@name'] = 'session';
exports['@singleton'] = true;
exports['@require'] = [];
