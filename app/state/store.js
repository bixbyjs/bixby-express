exports = module.exports = function(IoC) {
  
  return IoC.create('http://i.bixbyjs.org/http/StateStore')
    .catch(function(err) {
      return IoC.create('./store/session');
    });
};

exports['@singleton'] = true;
exports['@require'] = [
  '!container'
];
