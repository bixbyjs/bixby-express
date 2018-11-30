exports = module.exports = function(IoC, memory) {
  
  return memory;
};

exports['@implements'] = 'http://i.bixbyjs.org/http/session/Store';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  './store/memory'
];
