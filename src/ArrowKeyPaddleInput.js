var ArrowKeyPaddleInput = function(options){
  var paddleController = options.paddleController;
  var controlStates = { NONE: 'none', RIGHT: 'right', LEFT: 'left' }
  var controlState = controlStates.NONE;
  var movePaddle = function(){
    if(controlState == controlStates.RIGHT){
      paddleController.moveRight(10);
    } else if(controlState == controlStates.LEFT) {
      paddleController.moveLeft(10);
    }
  };
  
  var bindInput = function(){
    setInterval(movePaddle, 15);
    
    document.onkeydown = function(keyboardEvent){
      if(controlState == controlStates.NONE){
        if(keyboardEvent.code == "ArrowRight"){
          controlState = controlStates.RIGHT;
        } else if(keyboardEvent.code == "ArrowLeft") {
          controlState = controlStates.LEFT;
        }
      }
    };
    
    document.onkeyup = function(keyboardEvent){
      if(keyboardEvent.code == "ArrowLeft" && controlState == controlStates.LEFT){
        controlState = controlStates.NONE;
      } else if(keyboardEvent.code == "ArrowRight" && controlState == controlStates.RIGHT){
        controlState = controlStates.NONE;
      }
    };
  }
  bindInput();
};