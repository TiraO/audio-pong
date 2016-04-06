var WallCollisionDetector = function(){
  this.detectCollision = function(ball, stage){
    var collisions = [];
    var updatedBall = {
      position:
      {
        x: ball.position.x + ball.velocity.x,
        y: ball.position.y + ball.velocity.y
      },
      velocity: ball.velocity
    };
    
    if(updatedBall.position.x < 0) {
      updatedBall.position.x = 0;
      updatedBall.velocity.x *= -1;
      collisions.push(updatedBall);
    } else if(updatedBall.position.x > stage.width) {
      updatedBall.position.x = stage.width;
      updatedBall.velocity.x *= -1;
      collisions.push(updatedBall);
    }
    
    if(updatedBall.position.y < 0){
      updatedBall.position.y = 0;
      updatedBall.velocity.y *= -1;
      collisions.push(updatedBall);
    } else if(updatedBall.position.y > stage.height){
      updatedBall.position.y = stage.height;
      updatedBall.velocity.y *= -1;
      collisions.push(updatedBall);
    }
    
    return collisions;
  };
};