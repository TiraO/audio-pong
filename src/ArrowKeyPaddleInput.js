var ArrowKeyPaddleInput = function(options){
  var paddleController = options.paddleController;
  var inputStates = { NONE: 'none', RIGHT: 'right', LEFT: 'left', LEFT_AND_RIGHT: 'left and right' }
  var inputState = inputStates.NONE;
  var movePaddle = function(){
    if(inputState == inputStates.RIGHT){
      paddleController.moveRight(10);
    } else if(inputState == inputStates.LEFT) {
      paddleController.moveLeft(10);
    }
  };
  
  var bindInput = function(){
    setInterval(movePaddle, 15);
    
    document.onkeydown = function(keyboardEvent){
      if(inputState == inputStates.NONE){
        if(keyboardEvent.code == "ArrowRight"){
          inputState = inputStates.RIGHT;
        } else if(keyboardEvent.code == "ArrowLeft") {
          inputState = inputStates.LEFT;
        }
      }
    };
    
    document.onkeyup = function(keyboardEvent){
      inputState = inputStates.NONE;
    };
  }
  bindInput();
};