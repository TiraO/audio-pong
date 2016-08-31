var PaddleCollisionDetector = function(){
  this.detectCollision = function(ball, paddle){
    var geometryHelper = singletonContext.geometryHelper;
    var updatedBall = {
      position: {
        x: ball.position.x + ball.velocity.x, 
        y: ball.position.y + ball.velocity.y
      },
      velocity: ball.velocity
    };
    
    if(geometryHelper.pointIsInsideRectangle(updatedBall.position, paddle)){

      var hitLocationProportion = (updatedBall.position.x - paddle.bottomLeft.x - paddle.width/2)/paddle.width;
              
      var normalize = function(vector){
        var vectorLength = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
        var normalized = {
          x: vector.x/vectorLength, 
          y: vector.y/vectorLength
        }
        return normalized;
      };
      
      var normal = normalize({ y: -20, x: hitLocationProportion*20});
      var incidenceNormalDot = ball.velocity.x*normal.x + ball.velocity.y*normal.y;
      var reflection = {
        x: -1*(2*incidenceNormalDot*normal.x - ball.velocity.x),
        y: -1*(2*incidenceNormalDot*normal.y - ball.velocity.y)
      };
      
      return {
        collisionSurface: 'PADDLE',
        position: {
          x: updatedBall.position.x,
          y: paddle.bottomLeft.y - paddle.height
        },
        velocity: reflection, 
        normal: normal
      };
    }
    return null;
  }
};