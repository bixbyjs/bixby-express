exports = module.exports = function() {
  var flowstate = require('flowstate');
  
  var router = new flowstate.Manager();
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/flows/Dispatcher';
exports['@singleton'] = true;
