var WallCollisionDetector = function(){
  this.detectCollisions = function(ball, stage){
    var collisions = [];
    var updatedBall = {
      position:
      {
        x: ball.position.x + ball.velocity.x,
        y: ball.position.y + ball.velocity.y
      },
      velocity: ball.velocity
    };

    var ballHasStruckLeftWall = updatedBall.position.x < 0;
    var ballHasStruckRightWall = updatedBall.position.x > stage.width;
    var ballHasStruckUpperWall = updatedBall.position.y < 0;
    var ballHasStruckLowerWall = updatedBall.position.y > stage.height;
    
    if(ballHasStruckLeftWall) {
      updatedBall.position.x = 0;
      updatedBall.velocity.x *= -1;
      updatedBall.collisionSurface = 'LEFT_WALL';
      collisions.push(updatedBall);
    } else if(ballHasStruckRightWall) {
      updatedBall.position.x = stage.width;
      updatedBall.velocity.x *= -1;
      updatedBall.collisionSurface = 'RIGHT_WALL';
      collisions.push(updatedBall);
    }
    
    if(ballHasStruckUpperWall){
      updatedBall.position.y = 0;
      updatedBall.velocity.y *= -1;
      updatedBall.collisionSurface = 'TOP_WALL';
      collisions.push(updatedBall);
    } else if(ballHasStruckLowerWall){
      updatedBall.position.y = stage.height;
      updatedBall.velocity.y *= -1;
      updatedBall.collisionSurface = 'BOTTOM_WALL';
      collisions.push(updatedBall);
    }
    
    return collisions;
  };
};
