var ArrowKeyPaddleInput = function(options){
  var paddleController = options.paddleController;
  var inputStates = { NONE: 'none', RIGHT: 'right', LEFT: 'left', LEFT_AND_RIGHT: 'left and right' }
  var inputState = inputStates.NONE;
  var movePaddle = function(){
    paddleController.moveRight(10);
  };
  
  var bindInput = function(){
    document.onkeydown = function(keyboardEvent){
      if(inputState == inputStates.NONE){
        if(keyboardEvent.code == "ArrowRight"){
          paddleController.moveRight(10);
        } else if(keyboardEvent.code == "ArrowLeft") {
          paddleController.moveLeft(10);
        }
        inputState = inputState.LEFT_AND_RIGHT;
        setInterval(movePaddle, 15);
      }
    };
    
    document.onkeyup = function(keyboardEvent){
      inputState = inputStates.NONE;
    };
  }
  bindInput();
};