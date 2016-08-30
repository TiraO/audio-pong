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
        gameRunner.runStep();
        expect(singletonContext.scoreUpdater.update).toHaveBeenCalledWith(['LEFT_WALL', 'PADDLE']);
      });
    });
    
    describe('when the ball hits the bottom wall', function(){
      var ballController;
      beforeEach(function(){
        ballController = singletonContext.ballController;
        singletonContext.lives = 3;
        spyOn(singletonContext.ballKinematicsUpdater, 'update').and.returnValue({ ball: new Ball(), collisionSurfaces: ['BOTTOM_WALL']});
      });
      
      it('sticks the ball to the paddle', function(){
        spyOn(ballController, 'stickBallToPaddle');
        gameRunner.runStep();
        expect(ballController.stickBallToPaddle).toHaveBeenCalled();
      });
      
      it('decrements the life counter', function(){
        gameRunner.runStep();
        expect(singletonContext.lives).toBe(2);
      });
      
      describe('when it was your final life', function(){
        beforeEach(function(){
          singletonContext.lives = 1;
          singletonContext.playerScore = 1000;
        });
        
        it('sets the score to 0', function(){
          gameRunner.runStep();
          expect(singletonContext.playerScore).toBe(0);
        });
        
        it('resets player lives', function(){
          gameRunner.runStep();
          expect(singletonContext.lives).toBe(3);
        });
      });
    });
  });
});