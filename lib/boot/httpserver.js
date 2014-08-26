/**
 * Module dependencies.
 */
var http = require('http')
  , https = require('https')
  , cluster = require('cluster')
  , os = require('os')
  , fs = require('fs');


/**
 * Component-ized boot phase that listens for HTTP requests.
 *
 * This component provides a boot phase that starts an HTTP or HTTPS server (or
 * cluster of such servers).  The server is configured according to the settings
 * loaded by common components.
 *
 * To utilize this component within an application, configure the IoC loader
 * to use common Express components.
 *
 *     IoC.loader(require('bixby-express'));
 *
 * @param {Settings} settings
 * @param {Logger} logger
 * @return {Function}
 */
exports = module.exports = function(settings, logger) {
  
  return function httpServer(done) {
    var config = settings.get('server') || {};
    var address = config.address || '0.0.0.0';
    var port = config.port !== undefined ? config.port : 8080;
    
    
    if (cluster.isMaster && config.cluster) {
      var size = config.size || os.cpus().length;
      
      logger.info('Creating cluster with %d workers', size);
      
      for (var i = 0; i < size; ++i) {
        logger.info('Spawning worker process %d', (i + 1));
        cluster.fork();
      }
      
      cluster.on('fork', function(worker) {
        logger.info('Worker %s (%d) spawned', worker.id, worker.process.pid);
      });
      cluster.on('online', function(worker) {
        logger.info('Worker %s (%d) online', worker.id, worker.process.pid);
      });
      cluster.on('listening', function(worker, addr) {
        logger.info('Worker %s (%d) listening on %s:%d', worker.id, worker.process.pid, addr.address, addr.port);
      });
      cluster.on('disconnect', function(worker) {
        logger.info('Worker %s (%d) disconnected', worker.id, worker.process.pid);
      });
      cluster.on('exit', function(worker, code, signal) {
        logger.error('Worker %s (%d) died (%s)', worker.id, worker.process.pid, signal || code);
        if (!worker.suicide) {
          logger.info('Restarting worker %s', worker.id);
          cluster.fork();
        }
      });
    } else {
      if (config.secure) {
        var key = fs.readFileSync(config.keyPath)
          , cert = fs.readFileSync(config.certPath)
          , ca = [];
        
        var caPaths = config.caPath || [];
        if (typeof caPaths == 'string') {
          caPaths = [ caPaths ];
        } else if (typeof caPaths == 'object') {
          // FIMXE: I don't think this is necessary.  It should have a length property
          //        and sequential integer keys
          
          // NOTE: This is a workaround for TOML-formatted configuration files
          //       which specify a "caPath" setting containing an array of
          //       strings.  For example:
          //
          //         [server]
          //         caPath = [ "foo_ca.pem", "bar_ca.pem" ]
          //
          //       In such a scenario, the object structure is not an array,
          //       but an object in which the keys are array indices.  For
          //       example:
          //
          //         { '0': 'foo_ca.pem', '1': 'bar_ca.pem' }
          //
          //       The workaround converts such a structure to a traditional
          //       array.
          
          var vals = [];
          var keys = Object.keys(caPaths).forEach(function(key) {
            vals.push(caPaths[key]);
          });
          caPaths = vals;
        }
        
        for (var i = 0, len = caPaths.length; i < len; ++i) {
          ca.push(fs.readFileSync(caPaths[i]));
        }
        
        
        var opts = {
          key: key,
          cert: cert,
          passphrase: config.passphrase,
          requestCert: config.requestCert,
          rejectUnauthorized: config.rejectUnauthorized
        };
        if (ca.length) { opts.ca = ca; }
        
        this.httpsServer = https.createServer(opts, this);
        this.httpsServer.listen(port, address, function() {
          var addr = this.address();
          logger.info('HTTPS server listening on %s:%d', addr.address, addr.port);
          return done();
        });
      } else {
        this.httpServer = http.createServer(this);
        this.httpServer.listen(port, address, function() {
          var addr = this.address();
          logger.info('HTTP server listening on %s:%d', addr.address, addr.port);
          return done();
        });
      }
    }
  };
}

/**
 * Component annotations.
 */
exports['@require'] = [ 'settings', 'logger' ];
