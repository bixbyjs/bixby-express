exports = module.exports = function(logger) {
  var util = require('util');
  
  var inspect = util.inspect
  var toString = Object.prototype.toString
  
  /**
   * Stringify a value.
   * @api private
   */
  function stringify (val) {
    var stack = val.stack

    if (stack) {
      return String(stack)
    }

    var str = String(val)

    return str === toString.call(val)
      ? inspect(val)
      : str
  }

  
  return function() {
    return function(err, req, res, next) {
      var str = stringify(err);
      logger.error(str || err.stack);
      next(err);
    };
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/middleware/errorLogging';
exports['@require'] = [
  'http://i.bixbyjs.org/Logger'
];
