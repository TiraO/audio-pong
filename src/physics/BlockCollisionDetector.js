var BlockCollisionDetector = function(){
  this.detectCollision = function(ball, block){
    var geometryHelper = singletonContext.geometryHelper;
    var updatedPosition = geometryHelper.addVectors(ball.position, ball.velocity);
    if(geometryHelper.pointIsInsideRectangle(updatedPosition, block)){
      var bottomLeft = block.bottomLeft;
      var topLeft = geometryHelper.addVectors(block.bottomLeft, {x:0, y: -block.height});
      var bottomRight = geometryHelper.addVectors(block.bottomLeft, {x:block.width, y: 0});
      var topRight = geometryHelper.addVectors(block.bottomLeft, {x: block.width, y: -block.height});
      
      var collisionResult = { collisionSurface: 'BLOCK', ball: { position:{}, velocity:{} }};
      
      if(this.ballIsLeftOfBlock(ball, block)){
        var leftIntersectionResult = geometryHelper.findLineIntersection(bottomLeft, topLeft, ball.position, updatedPosition);
        if(leftIntersectionResult.segmentsIntersect){
          collisionResult.ball = {
            position: { x: leftIntersectionResult.x, y: leftIntersectionResult.y },
            velocity: this.reverseX(ball.velocity)
          };
          return collisionResult;
        }
      }
      
      if( this.ballIsRightOfBlock(ball, block)){
        var rightIntersectionResult = geometryHelper.findLineIntersection(bottomRight, bottomRight, ball.position, updatedPosition);
        if(rightIntersectionResult.segmentsIntersect){
          collisionResult.ball = {
            position: { x: rightIntersectionResult.x, y: rightIntersectionResult.y },
            velocity: this.reverseX(ball.velocity)
          };
          return collisionResult;
        }
      }
      
      if(this.ballIsAboveBlock(ball, block)){
        var topIntersectionResult = geometryHelper.findLineIntersection(topLeft, topRight, ball.position, updatedPosition);
        if(topIntersectionResult.segmentsIntersect){
          collisionResult.ball = {
            position: { x: topIntersectionResult.x, y: topIntersectionResult.y },
            velocity: this.reverseY(ball.velocity)
          };
          return collisionResult;
        }
      }
      
      if(this.ballIsBelowBlock(ball, block)){
        var bottomIntersectionResult = geometryHelper.findLineIntersection(bottomLeft, bottomRight, ball.position, updatedPosition);
        if(bottomIntersectionResult.segmentsIntersect){
          collisionResult.ball = {
            position: { x: bottomIntersectionResult.x, y: bottomIntersectionResult.y },
            velocity: this.reverseY(ball.velocity)
          };
          return collisionResult;
        }
      }
    } else {
      return null;
    }
  };
  
  this.ballIsAboveBlock = function(ball, block){
    return ball.position.y < block.bottomLeft.y - block.height;
  };
  
  this.ballIsBelowBlock = function(ball, block){
    return ball.position.y > block.bottomLeft.y;
  };
  
  this.ballIsLeftOfBlock = function(ball, block){
    return ball.position.x < block.bottomLeft.x;
  };
  
  this.ballIsRightOfBlock = function(ball, block){
    return ball.position.x > block.bottomLeft.x + block.width;
  };
  
  this.reverseX = function(vector){
    return {x: -vector.x, y: vector.y};
  };
  
  this.reverseY = function(vector){
    return {x: vector.x, y: -vector.y};
  };
};
                