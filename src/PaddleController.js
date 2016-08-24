var PaddleController = function(options){
  options = options || {};
  var paddle = options.paddle;
  var ball = options.ball;
  this.moveRight = function(amount){
    var stage = options.stage || singletonContext.stage;
    paddle.bottomLeft.x = Math.min(paddle.bottomLeft.x + amount, stage.width - paddle.width);
    
    if(ball && ball.isStuckToPaddle()){
      ball.position.x = paddle.bottomLeft.x + paddle.width/2;
    }
  };
  
  this.moveLeft = function(amount){
    paddle.bottomLeft.x = Math.max(0, paddle.bottomLeft.x - amount);
    
    if(ball && ball.isStuckToPaddle()){
      ball.position.x = paddle.bottomLeft.x + paddle.width/2;
    }
  };
  
  this.stickBall = function(){
    ball.position.x = paddle.bottomLeft.x + paddle.width/2;
    ball.position.y = paddle.bottomLeft.y - paddle.height;
    ball.stickToPaddle();
  };
};