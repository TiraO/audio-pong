var BallKinematicsUpdater = function(options){
 
  this.update = function(ball, stage, paddle){
    options = options || {};
  var wallCollisionDetector = options.wallCollisionDetector || singletonContext.wallCollisionDetector;
  var paddleCollisionDetector = options.paddleCollisionDetector || singletonContext.paddleCollisionDetector;
    if(ball.isStuckToPaddle()){
      return { ball: ball, collisionSurfaces: []};
    }
    
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
    var result = {
      ball: updatedBall,
      collisionSurfaces: _.map(collisions, 'collisionSurface')
    };
    
    if(collisions.length > 0 ){
      result.ball = collisions[0];
    }

    return result;
  };
};