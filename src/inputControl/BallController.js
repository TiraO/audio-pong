var BallController = function(options){
  var ball = options.ball;
  var paddle = options.paddle;
  
  this.releaseBall = function(){
    ball.stuck = false;
  };
  
  this.stickBallToPaddle = function(){
    ball.stuck = true;
    ball.position.x = paddle.bottomLeft.x + paddle.width/2;
    ball.position.y = paddle.bottomLeft.y - paddle.height;
  };
};