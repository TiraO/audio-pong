var BallKinematicsUpdater = function(wallCollisionDetector){
  this.update = function(ball, stage){
    var updatedBall = {
      position:
        {
          x: ball.position.x + ball.velocity.x,
          y: ball.position.y + ball.velocity.y
        },
        velocity: ball.velocity
    };
    
    var collisions = wallCollisionDetector.detectCollision(ball, stage);
    if(collisions.length > 0 ){
      return collisions[0];
    }
    return updatedBall;
  };
};