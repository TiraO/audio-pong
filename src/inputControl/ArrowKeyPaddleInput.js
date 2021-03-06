var ArrowKeyPaddleInput = function(options){
  var paddleController = options.paddleController;
  var eventBus = options.eventBus;
  var ControlStates = { NONE: 'none', RIGHT: 'right', LEFT: 'left' }
  var controlState = ControlStates.NONE;
  var inputStates = {
    right: false,
    left: false
  };
  var movePaddle = function(){
    if(controlState == ControlStates.RIGHT){
      paddleController.moveRight(10);
    } else if(controlState == ControlStates.LEFT) {
      paddleController.moveLeft(10);
    }
  };
  
  var bindInput = function(){
    setInterval(movePaddle, 15);
    
    eventBus.listenForKeydown("ArrowRight", function(){
      inputStates.right = true;
      controlState = ControlStates.RIGHT;
    });
    
    eventBus.listenForKeydown("ArrowLeft", function(){
      inputStates.left = true;
      controlState = ControlStates.LEFT;
    });
    
    document.onkeyup = function(keyboardEvent){
      if(keyboardEvent.code == "ArrowLeft"){
        inputStates.left = false;
        if(inputStates.right){
          controlState = ControlStates.RIGHT;
        } else {
          controlState = ControlStates.NONE;
        }
      } else if(keyboardEvent.code == "ArrowRight"){
        inputStates.right = false;
        if(inputStates.left){
          controlState = ControlStates.LEFT;
        } else {
          controlState = ControlStates.NONE;
        }
      }
    };
  }
  bindInput();
};