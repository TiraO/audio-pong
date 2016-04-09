var PaddleCollisionDetector = function(){
  this.detectCollision = function(ball, paddle){
    var updatedBall = {
      position: {
        x: ball.position.x + ball.velocity.x, 
        y: ball.position.y + ball.velocity.y
      },
      velocity: ball.velocity
    };
    
    if(updatedBall.position.x > paddle.bottomLeft.x
       && updatedBall.position.y < paddle.bottomLeft.y
       && updatedBall.position.x < paddle.bottomLeft.x + paddle.width 
       && updatedBall.position.y > paddle.bottomLeft.y - paddle.height){

      
      var hitLocationProportion = (updatedBall.position.x - paddle.bottomLeft.x - paddle.width/2)/paddle.width;
      var radians = Math.atan2(ball.velocity.y, ball.velocity.x);
      
      return {
        position: {
          x: updatedBall.position.x,
          y: paddle.bottomLeft.y - paddle.height
        },
        velocity: {
          x: ball.velocity.x*Math.cos(radians),
          y: -1*ball.velocity.y*Math.sin(radians)
        }
      };
    }
    return null;
  }
};