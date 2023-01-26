var SessionStore = require('flowstate').SessionStore;

exports = module.exports = function() {
  return new SessionStore();
};

exports['@singleton'] = true;
exports['@implements'] = 'module:flowstate.Store';
exports['@require'] = [];
