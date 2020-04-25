var EventBus = function(){
  var callbacks = {};
  var interactionCallbacks = [];
  this.listenForKeydown = function(keyCode, callback){
    callbacks[keyCode] = callback;
  };
  this.listenForAnyInteraction = function (callback) {
    interactionCallbacks.push(callback);
  };

  var onkeydown = function(keyboardEvent){
    var callback = callbacks[keyboardEvent.code];
    if(callback){
      callback(keyboardEvent);
    }
    interactionCallbacks.forEach(function (callback) {
      callback.apply(null);
    })
  };
  
  this.receiveKeydownEvent = onkeydown;
  
  var bindInput = function(){
    document.onkeydown = onkeydown;
  }
  bindInput();
};