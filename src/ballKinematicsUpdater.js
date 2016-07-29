var BallKinematicsUpdater = function(wallCollisionDetector, paddleCollisionDetector){
  this.update = function(ball, stage, paddle){
    var updatedBall = {
      position:
        {
          x: ball.position.x + ball.velocity.x,
          y: ball.position.y + ball.velocity.y
        },
        velocity: ball.velocity
    };
    var collisions = wallCollisionDetector.detectCollisions(ball, stage);
    var paddleCollision = paddleCollisionDetector.detectCollision(ball, paddle);
    if(paddleCollision){
      collisions.push(paddleCollision);
    }
    
    if(collisions.length > 0 ){
      var collision = collisions[0];
      updatedBall = {
        normal: collision.normal,
        position:
          {
            x: Math.round(collision.position.x),
            y: Math.round(collision.position.y)
          },
          velocity: 
          {
            x: Math.round(collision.velocity.x),
            y: Math.round(collision.velocity.y)
          },
      };
      return collisions[0];
    }
    return updatedBall;
  };
};