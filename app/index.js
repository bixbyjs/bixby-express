exports = module.exports = {
  'middleware/authenticate': require('./middleware/authenticate'),
  'middleware/csrfprotection': require('./middleware/csrfprotection'),
  'middleware/loadstate': require('./middleware/loadstate'),
  'middleware/parse': require('./middleware/parse')
};


exports.load = function(id) {
  try {
    return require('./' + id);
  } catch (ex) {
    if (ex.code == 'MODULE_NOT_FOUND') { return; }
    throw ex;
  }
};
