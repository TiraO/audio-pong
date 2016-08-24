describe("GameRunner", function(){
  var gameRunner;
  beforeEach(function(){
    gameRunner = new GameRunner();
  });
  describe("runStep", function(){
    var ball, stage, paddle;
    beforeEach(function(){
      ball = singletonContext.ball;
      stage = singletonContext.stage;
      paddle = singletonContext.arrowControlledPaddle;
    });
    
    it("updates the ball kinematics", function(){
      spyOn(singletonContext.ballKinematicsUpdater, 'update').and.returnValue({
        ball: {
          position: 'some new position', 
          velocity: 'some new velocity'
        }
      });
      gameRunner.runStep();
      expect(singletonContext.ball.position).toEqual('some new position'); 
      expect(singletonContext.ball.velocity).toEqual('some new velocity'); 
      expect(singletonContext.ballKinematicsUpdater.update).toHaveBeenCalledWith(ball, stage, paddle);
    });
    
    describe("when there is a collision", function(){
      beforeEach(function(){
        spyOn(singletonContext.ballKinematicsUpdater, 'update').and.returnValue({ ball: {}, collisionSurfaces: ['LEFT_WALL', 'PADDLE']});
      });
      
      it("updates the score", function(){
        spyOn(singletonContext.scoreUpdater, 'update');
       gameRunner.runStep(); expect(singletonContext.scoreUpdater.update).toHaveBeenCalledWith(['LEFT_WALL', 'PADDLE']);
      });
    });
  });
});