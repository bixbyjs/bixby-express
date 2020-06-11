exports = module.exports = function(IoC) {
  
  return new Promise(function(resolve, reject) {
    var components = IoC.components('http://i.bixbyjs.org/http/Gateway')
      , gateways = [];
    
    (function iter(i) {
      var component = components[i];
      if (!component) {
        if (gateways.length == 0) {
          return resolve(Promise.all([ IoC.create('./gateway/http') ]));
        }
        
        return resolve(gateways);
      }
      
      component.create()
        .then(function(gateway) {
          gateways.push(gateway);
          iter(i + 1);
        }, function(err) {
          console.log('ERROR')
          console.log(err)
        });
    })(0);
  });
};

exports['@require'] = [ '!container' ];
