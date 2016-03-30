describe("BallKinematicsUpdater", function(){
  var ballKinematicsUpdater;
  beforeEach(function(){
    ballKinematicsUpdater = new BallKinematicsUpdater();
    
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
    
    describe("when the position plus the x speed is left of the stage", function(){
      var ball;
      beforeEach(function(){
        ball = {
          position: {x: 5, y: 123},
          velocity: {x: -10, y: 123}
        };
      });
      
      it("sets the x position to the left stage x", function(){
        var updatedBall = ballKinematicsUpdater.update(ball,  stage);
        expect(updatedBall.position.x).toEqual(0);
      });
      
      it("sets the x speed to the reverse of whatever it was", function(){
        var updatedBall = ballKinematicsUpdater.update(ball,  stage);
        expect(updatedBall.velocity.x).toEqual(10);
      });
    });
    
    describe("when the position plus the x speed is right of the stage", function(){
      var ball;
      beforeEach(function(){
        ball = {
          position: {x: 495, y: 123},
          velocity: {x: 11, y: 123}
        };
      });
      
      it("sets the x position to the right stage x", function(){
        var updatedBall = ballKinematicsUpdater.update(ball, stage);
        expect(updatedBall.position.x).toEqual(500);
      });
      
      it("sets the x speed to the reverse of whatever it was", function(){
        var updatedBall = ballKinematicsUpdater.update(ball,  stage);
        expect(updatedBall.velocity.x).toEqual(-11);
      });
    });
    
    describe("when the y position is below the bottom of the stage", function(){
      beforeEach(function(){
        ball.position.y = 595;
        ball.velocity.y = 12;
      });

      it("sets the y position to the bottom of the stage", function(){
        var updatedBall = ballKinematicsUpdater.update(ball, stage);
        expect(updatedBall.position.y).toEqual(600);
      });
      
      it("sets the y speed to the reverse of whatever it was", function(){
        var updatedBall = ballKinematicsUpdater.update(ball, stage);
        expect(updatedBall.velocity.y).toEqual(-12);
      });
    });
    
    describe("when the y position is above the top of the stage", function(){
      beforeEach(function(){
        ball.position.y = 5;
        ball.velocity.y = -13;
      });

      it("sets the y position to the top of the stage", function(){
        var updatedBall = ballKinematicsUpdater.update(ball, stage);
        expect(updatedBall.position.y).toEqual(0);
      });
      
      it("sets the y speed to the reverse of whatever it was", function(){
        var updatedBall = ballKinematicsUpdater.update(ball, stage);
        expect(updatedBall.velocity.y).toEqual(13);
      });
    });
  });
});