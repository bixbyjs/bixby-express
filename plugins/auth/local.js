function factory(verifyPassword) {
  var Strategy = require('passport-local');
  
  var strategy = new Strategy(verifyPassword);
  return strategy;
}

factory['@implements'] = 'http://i.bixbyjs.org/http/auth/Scheme';
factory['@require'] = [
  'http://i.bixbyjs.org/aaa/verifyPasswordFunc'
];


exports = module.exports = {
  'local': factory,
};
