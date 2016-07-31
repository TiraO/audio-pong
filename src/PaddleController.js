var PaddleController = function(options){
  options = options || {};
  var paddle = options.paddle;
  this.moveRight = function(amount){
    paddle.bottomLeft.x += amount;
  };
  this.moveLeft = function(amount){
    paddle.bottomLeft.x -= amount;
  };
};