// TODO

exports = module.exports = function() {
  console.log('create redis session store!');
  
  //return 'foo'
}


exports['@implements'] = 'http://i.bixbyjs.org/http/session/Store';
exports['@protocol'] = 'redis';
exports['@require'] = [
];
