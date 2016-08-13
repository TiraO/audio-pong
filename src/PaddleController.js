var PaddleController = function(options){
  options = options || {};
  var paddle = options.paddle;
  this.moveRight = function(amount){
    var stage = options.stage || singletonContext.stage;
    paddle.bottomLeft.x = Math.min(paddle.bottomLeft.x + amount, stage.width - paddle.width);
    
  };
  
  this.moveLeft = function(amount){
    paddle.bottomLeft.x = Math.max(0, paddle.bottomLeft.x - amount);
  };
};