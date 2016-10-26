exports = module.exports = function(store) {
  var flowstate = require('flowstate');
  
  var router = new flowstate.Manager(store);
  return router;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ua/flows/Dispatcher';
exports['@singleton'] = true;
exports['@require'] = [
  'http://i.bixbyjs.org/http/ua/flows/StateStore'
];
