exports = module.exports = function(sd) {
  
  return function(cb) {
    console.log('DISCOVER REDIS?');
    
    sd.resolve('_session-redis._tcp', function(err, records) {
      console.log('RESOLVED!');
      console.log(err)
      console.log(records)
      
      cb(err, records);
    });
  }
};

exports['@implements'] = 'http://i.bixbyjs.org/http/session/StoreServiceDiscoverFunc';
exports['@type'] = 'redis';
exports['@require'] = [
  'http://i.bixbyjs.org/sd'
];
