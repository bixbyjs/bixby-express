exports = module.exports = function(sd) {
  
  return function(cb) {
    sd.resolve('_sess-redis._tcp', 'SRV', function(err, records) {
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

exports['@implements'] = 'http://i.bixbyjs.org/http/session/StoreDiscoverFunc';
exports['@service'] = 'sess-redis';
exports['@protocol']  = 'tcp';
exports['@require'] = [
  'http://i.bixbyjs.org/sd'
];
