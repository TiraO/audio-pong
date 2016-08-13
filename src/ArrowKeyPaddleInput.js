var ArrowKeyPaddleInput = function(options){
  var paddleController = options.paddleController;
  var ControlStates = { NONE: 'none', RIGHT: 'right', LEFT: 'left' }
  var controlState = ControlStates.NONE;
  var movePaddle = function(){
    if(controlState == ControlStates.RIGHT){
      paddleController.moveRight(10);
    } else if(controlState == ControlStates.LEFT) {
      paddleController.moveLeft(10);
    }
  };
  
  var bindInput = function(){
    setInterval(movePaddle, 15);
    
    document.onkeydown = function(keyboardEvent){
      if(controlState == ControlStates.NONE){
        if(keyboardEvent.code == "ArrowRight"){
          controlState = ControlStates.RIGHT;
        } else if(keyboardEvent.code == "ArrowLeft") {
          controlState = ControlStates.LEFT;
        }
      }
    };
    
    document.onkeyup = function(keyboardEvent){
      if(keyboardEvent.code == "ArrowLeft" && controlState == ControlStates.LEFT){
        controlState = ControlStates.NONE;
      } else if(keyboardEvent.code == "ArrowRight" && controlState == ControlStates.RIGHT){
        controlState = ControlStates.NONE;
      }
    };
  }
  bindInput();
};