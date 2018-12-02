exports = module.exports = function(sd) {
  
  return function(cb) {
    sd.resolve('_session-redis._tcp', function(err, records) {
      if (err) { return cb(err); }
      
      records = records.map(function(rec) {
        return {
          url: 'redis://' + rec.name
        };
      });
      cb(err, records);
    });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/session/StoreServiceDiscoverFunc';
exports['@type'] = 'redis';
exports['@require'] = [
  'http://i.bixbyjs.org/sd'
];
