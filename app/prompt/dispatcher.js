exports = module.exports = function(IoC, store, logger) {
  var flowstate = require('flowstate');
  
  var dispatcher = new flowstate.Manager(store);
  
  return Promise.resolve(dispatcher)
    .then(function(dispatcher) {
      var components = IoC.components('http://i.bixbyjs.org/http/workflow/Activityx');
      console.log(components)
    
      return Promise.all(components.map(function(comp) { return comp.create(); } ))
        .then(function(plugins) {
          plugins.forEach(function(plugin, i) {
            logger.info('Loaded HTTP activity: ' + components[i].a['@name']);
            //dispatcher.use(create(plugin));
          });
        })
        .then(function() {
          return dispatcher;
        });
    })
    .then(function(dispatcher) {
      return dispatcher;
    });
  
  
  return;
  
  
  return dispatcher;
  
  // FIXME: Implement this again, when circular dependecny is fixed
  //        (login/task/resume) needs this Dispatcher.
  //        Also, electrolyte needs a test for this in promise based mode.
  var taskDecls = container.specs('http://i.bixbyjs.org/http/workflow/Activityx');
  console.log('LOADING TASKS!');
  console.log(taskDecls);
  
  return Promise.all(taskDecls.map(function(spec) { return container.create(spec.id); } ))
    .then(function(tasks) {
      console.log('CREATED!');
      console.log(tasks);
      
      tasks.forEach(function(task, i) {
        var name = taskDecls[i].a['@name'];
        dispatcher.use(name, task.begin, task.resume);
        logger.info('Loaded web-based task: ' + name);
      });
    }, function(err) {
      console.log(err);
      throw err;
    })
    .then(function() {
      return dispatcher;
    });
};

// TODO: Rename this to http/flow/Dispatcher
exports['@implements'] = 'http://i.bixbyjs.org/http/state/Dispatcher';
exports['@singleton'] = true;
exports['@require'] = [
  '!container',
  'http://i.bixbyjs.org/http/workflow/StateStore',
  'http://i.bixbyjs.org/Logger'
];
