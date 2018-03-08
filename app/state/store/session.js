exports = module.exports = function() {
  var flowstate = require('flowstate');
  
  
  return {
    canCreate: function(options) {
      return true;
    },
    
    create: function(options) {
      return new flowstate.SessionStore();
    }
  };
};

exports['@name'] = 'session';
exports['@singleton'] = true;
exports['@require'] = [];
