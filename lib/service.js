exports = module.exports = function() {
  return require('express')();
}

exports['@singleton'] = true;
exports['@implements'] = 'http://i.expressjs.com/Service';
