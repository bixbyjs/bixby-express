exports = module.exports = function() {

  return function(timestamp, nonce, cb) {
    // validate the timestamp and nonce as necessary
    return cb(null, true)
  };
};

exports['@require'] = [];
