exports = module.exports = function(sd) {
  
  return function(cb) {
    sd.resolve('_sess-redis._tcp', 'SRV', function(err, records) {
      if (err) { return cb(err); }
      if (!records) { return cb(null); }
      
      records = records.map(function(rec) {
        return {
          url: 'redis://' + rec.name
        };
      });
      cb(err, records, { service: 'sess-redis', protocol: 'tcp' });
    });
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/session/StoreDiscoverFunc';
exports['@service'] = 'sess-redis';
exports['@protocol'] = 'tcp';
exports['@require'] = [
  'http://i.bixbyjs.org/sd'
];
