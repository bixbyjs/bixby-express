exports = module.exports = function() {
  var express = require('express');
  return express();
}


exports['@singleton'] = true;
exports['@implements'] = 'http://i.bixbyjs.org/express/Service';
