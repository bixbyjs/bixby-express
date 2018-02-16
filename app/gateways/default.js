exports = module.exports = function(IoC) {
  
  return function() {
    return IoC.create('http://i.bixbyjs.org/http/Server');
  };
};

exports['@require'] = [ '!container' ];
