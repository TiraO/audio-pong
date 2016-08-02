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
      ball = {
        position: {x: 5, y: 11},
        velocity: {x: 10, y: 9}
      };
      
      stage = {
        width: 500,
        height: 600
      };
      
      paddle = new Paddle({stage: stage});
    });
    
    it("sets the x position to the position plus the x speed", function(){
      var updatedBall = ballKinematicsUpdater.update(ball,  stage, paddle);
      expect(updatedBall.position.x).toEqual(15);
    });
    
    it("sets the y position to the position plus the y speed", function(){
      var updatedBall = ballKinematicsUpdater.update(ball,  stage, paddle);
      expect(updatedBall.position.y).toEqual(20);
    });
    
    describe("when there is a wall collision", function(){
      beforeEach(function(){
        var someCollision = { "some": "suggested ball state" };
        wallCollisionDetector.detectCollisions.and.returnValue([someCollision]);
      });
      
      it("returns that collision as the new ball", function(){
        var updatedBall = ballKinematicsUpdater.update(ball,  stage, paddle);
        expect(updatedBall).toEqual( { "some": "suggested ball state" });
      });
    });
    describe("when there is a paddle collision", function(){
      beforeEach(function(){
        var someCollision = { "some": "suggested ball state" };
        paddleCollisionDetector.detectCollision.and.returnValue(someCollision);
      });
      
      it("returns that collision as the new ball", function(){
        var updatedBall = ballKinematicsUpdater.update(ball,  stage, paddle);
        expect(updatedBall).toEqual( { "some": "suggested ball state" });
      });
    });
  });
});