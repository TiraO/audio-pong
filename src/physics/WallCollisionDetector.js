var WallCollisionDetector = function(){
  this.detectCollisions = function(ball, stage){
    var collisions = [];
    var collision = {
      position:
      {
        x: ball.position.x + ball.velocity.x,
        y: ball.position.y + ball.velocity.y
      },
      velocity: ball.velocity
    };

    var ballHasStruckLeftWall = collision.position.x < 0;
    var ballHasStruckRightWall = collision.position.x > stage.width;
    var ballHasStruckUpperWall = collision.position.y < 0;
    var ballHasStruckLowerWall = collision.position.y > stage.height;
    
    if(ballHasStruckLeftWall) {
      collision.position.x = 0;
      collision.velocity.x *= -1;
      collision.collisionSurface = {type: 'LEFT_WALL'};
      collisions.push(collision);
    } else if(ballHasStruckRightWall) {
      collision.position.x = stage.width;
      collision.velocity.x *= -1;
      collision.collisionSurface = {type: 'RIGHT_WALL'};
      collisions.push(collision);
    }
    
    if(ballHasStruckUpperWall){
      collision.position.y = 0;
      collision.velocity.y *= -1;
      collision.collisionSurface = {type: 'TOP_WALL'};
      collisions.push(collision);
    } else if(ballHasStruckLowerWall){
      collision.position.y = stage.height;
      collision.velocity.y *= -1;
      collision.collisionSurface = {type: 'BOTTOM_WALL'};
      collisions.push(collision);
    }
    
    return collisions;
  };
};
