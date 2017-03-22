exports = module.exports = {
  'middleware/authenticate': require('./middleware/authenticate'),
  'middleware/completetask': require('./middleware/completetask'),
  'middleware/csrfprotection': require('./middleware/csrfprotection'),
  'middleware/failtask': require('./middleware/failtask'),
  'middleware/initialize': require('./middleware/initialize'),
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
