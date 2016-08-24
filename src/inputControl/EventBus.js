var EventBus = function(){
  var callbacks = {};
  this.listenForKeydown = function(keyCode, callback){
    callbacks[keyCode] = callback;
  };
  
  var onkeydown = function(keyboardEvent){
    var callback = callbacks[keyboardEvent.code];
    if(callback){
      callback(keyboardEvent);
    }
  };
  
  this.receiveKeydownEvent = onkeydown;
  
  var bindInput = function(){
    document.onkeydown = onkeydown;
  }
  bindInput();
};