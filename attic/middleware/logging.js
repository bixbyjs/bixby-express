exports = module.exports = function() {
  
  return function() {
    var format = 'common';
    
    // TODO: Implement setting to select log format, for using combined log format
    
    return require('morgan')(format);
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/logging';
