exports = module.exports = function() {
  return require('express')();
}

exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/dn/expressjs.com/Service';
