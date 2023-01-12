exports.__use = function(c) {
  console.log('USED BIXBY EXPRESS!!!');
  
  c.on('create', function(obj, comp) {
    //console.log('**** CREATE A COMPONENT ******');
    //console.log(obj);
    //console.log(comp);
    
    if (comp.implements.indexOf('http://i.bixbyjs.org/http/Server') != -1) {
      console.log('CREATED HTTP SERVER!!!!');
    }
    
    
  });
}