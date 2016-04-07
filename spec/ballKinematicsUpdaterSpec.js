describe("BallKinematicsUpdater", function(){
  var ballKinematicsUpdater, wallCollisionDetector;
  beforeEach(function(){
    wallCollisionDetector = new WallCollisionDetector();
    spyOn(wallCollisionDetector, "detectCollisions").and.returnValue([]);
    ballKinematicsUpdater = new BallKinematicsUpdater(wallCollisionDetector);
  });
  
  describe("update", function(){
    var ball, stage;
    beforeEach(function(){
      ball = {
        position: {x: 5, y: 11},
        velocity: {x: 10, y: 9}
      };
      
      stage = {
        width: 500,
        height: 600
      };
    });
    
    it("sets the x position to the position plus the x speed", function(){
      var updatedBall = ballKinematicsUpdater.update(ball,  stage);
      expect(updatedBall.position.x).toEqual(15);
    });
    
    it("sets the y position to the position plus the y speed", function(){
      var updatedBall = ballKinematicsUpdater.update(ball,  stage);
      expect(updatedBall.position.y).toEqual(20);
    });
    
    describe("when there is a collision", function(){
      beforeEach(function(){
        var someCollision = { "some": "suggested ball state" };
        wallCollisionDetector.detectCollisions.and.returnValue([someCollision]);
      });
      
      it("returns that collision as the new ball", function(){
        var updatedBall = ballKinematicsUpdater.update(ball,  stage);
        expect(updatedBall).toEqual( { "some": "suggested ball state" });
      });
    });
  });
});