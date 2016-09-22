exports = module.exports = {
  'scheme': require('./oauth/scheme')
};

exports.load = function(id) {
  try {
    return require('./oauth' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
