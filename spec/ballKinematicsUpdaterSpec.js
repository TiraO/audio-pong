describe("BallKinematicsUpdater", function(){
  var ballKinematicsUpdater, wallCollisionDetector, paddleCollisionDetector;
  beforeEach(function(){
    wallCollisionDetector = new WallCollisionDetector();
    paddleCollisionDetector = new PaddleCollisionDetector();
    spyOn(wallCollisionDetector, "detectCollisions").and.returnValue([]);
    spyOn(paddleCollisionDetector, "detectCollision").and.returnValue(null);
    ballKinematicsUpdater = new BallKinematicsUpdater({
      wallCollisionDetector: wallCollisionDetector, 
      paddleCollisionDetector: paddleCollisionDetector});
  });
  
  describe("update", function(){
    var ball, stage, paddle;
    beforeEach(function(){
      ball = new Ball({
        position: {x: 5, y: 11},
        velocity: {x: 10, y: 9}
      });
      
      stage = {
        width: 500,
        height: 600
      };
      
      paddle = new Paddle({stage: stage});
    });
    
    it("sets the x position to the position plus the x speed", function(){
      var updatedBall = ballKinematicsUpdater.update(ball,  stage, paddle).ball;
      expect(updatedBall.position.x).toEqual(15);
    });
    
    it("sets the y position to the position plus the y speed", function(){
      var updatedBall = ballKinematicsUpdater.update(ball,  stage, paddle).ball;
      expect(updatedBall.position.y).toEqual(20);
    });
    
    describe("when there is a wall collision", function(){
      beforeEach(function(){
        var someCollision = { collisionSurface: 'LEFT_WALL', position: {} };
        wallCollisionDetector.detectCollisions.and.returnValue([someCollision]);
      });
      
      it("returns that collision as the new ball", function(){
        var updatedBall = ballKinematicsUpdater.update(ball,  stage, paddle).ball;
        expect(updatedBall).toEqual( { collisionSurface: 'LEFT_WALL', position: {} });
      });
      
      it('returns the collision surface as a collision surface', function(){
        var collisionSurfaces = ballKinematicsUpdater.update(ball,  stage, paddle).collisionSurfaces;
        expect(collisionSurfaces).toEqual(['LEFT_WALL']);
      });
      
    });
    describe("when there is a paddle collision", function(){
      beforeEach(function(){
        var someCollision = { collisionSurface:'PADDLE', position: {}};
        paddleCollisionDetector.detectCollision.and.returnValue(someCollision);
      });
      
      it("returns that collision as the new ball", function(){
        var updatedBall = ballKinematicsUpdater.update(ball,  stage, paddle).ball;
        expect(updatedBall).toEqual( { collisionSurface:'PADDLE', position: {}});
      });
      
      it('returns the collision surface as a collision surface', function(){
        var collisionSurfaces = ballKinematicsUpdater.update(ball,  stage, paddle).collisionSurfaces;
        expect(collisionSurfaces).toEqual(['PADDLE']);
      });
    });
    
    describe("when the ball is stuck to the paddle", function(){
      beforeEach(function(){
        ball.stickToPaddle();
      });
      
      it("does not update the ball kinematics", function(){
        var updatedBall = ballKinematicsUpdater.update(ball,  stage, paddle).ball;
        expect(updatedBall.position.x).toEqual(5);
        expect(updatedBall.position.y).toEqual(11);
        expect(updatedBall.velocity.x).toEqual(10);
        expect(updatedBall.velocity.y).toEqual(9);
      });
    });
  });
});