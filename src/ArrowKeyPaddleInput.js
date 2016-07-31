var ArrowKeyPaddleInput = function(options){
  var paddleController = options.paddleController;
  var bindInput = function(){
    document.onkeydown = function(keyboardEvent){
      if(keyboardEvent.code == "ArrowRight"){
        paddleController.moveRight(10);
      } else if(keyboardEvent.code == "ArrowLeft") {
        paddleController.moveLeft(10);
      }
    };
  }
  bindInput();
};