var BallKinematicsUpdater = function(options){
 
  this.update = function(ball, stage, paddle){
     var options = options || {};
  var wallCollisionDetector = options.wallCollisionDetector || singletonContext.wallCollisionDetector;
  var paddleCollisionDetector = options.paddleCollisionDetector || singletonContext.paddleCollisionDetector;
  
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
      return collisions[0];
    }
    return updatedBall;
  };
};