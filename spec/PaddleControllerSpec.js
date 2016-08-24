describe("PaddleController", function(){
  var paddleController, paddle, stage, ball;
  beforeEach(function(){
    paddle = new Paddle({ width: 10 });
    stage = new Stage({width: 100});
    ball = new Ball();

    paddleController = new PaddleController({paddle: paddle, stage: stage, ball: ball});
  });
  
  describe("moveRight", function(){
    it("increases the x coordinate of the paddle", function(){
      paddle.bottomLeft.x = 0;
      paddleController.moveRight(10);
      expect(paddle.bottomLeft.x).toBe(10);
    });
    
    describe("when the paddle would move beyond the right side of the stage", function(){
      it("sets the x of the paddle to the right side of the stage", function(){
        paddle.bottomLeft.x = 80;
        paddleController.moveRight(100);
        expect(paddle.bottomLeft.x).toBe(90);
      });
    });
    
    it('does not move the ball', function(){
      paddleController.moveRight(100);

      expect(ball.position.x).not.toBe(paddle.bottomLeft.x + paddle.width/2);
    });
    
    describe("when the ball is stuck to the paddle", function(){
      beforeEach(function(){
        ball.stickToPaddle();
      });
      
      it("sets the x coordinate of the ball to the center of the paddle", function(){
        paddleController.moveRight(100);
        
        expect(ball.position.x).toBe(paddle.bottomLeft.x + paddle.width/2);
      });
    });
  });
  
  describe("moveLeft", function(){
    it("decreases the x coordinate of the paddle", function(){
      paddle.bottomLeft.x = 12;
      paddleController.moveLeft(10);
      expect(paddle.bottomLeft.x).toBe(2);
    });
    
    describe("when the paddle would move beyond the left side of the stage", function(){
      it("sets the x of the paddle to 0", function(){
        paddle.bottomLeft.x = 10;
        paddleController.moveLeft(100);
        expect(paddle.bottomLeft.x).toBe(0);
      });
    });
    
    describe("when the ball is stuck to the paddle", function(){
      beforeEach(function(){
        ball.stickToPaddle();
      });
      
      it("sets the x coordinate of the ball to the center of the paddle", function(){
        paddleController.moveLeft(100);
        
        expect(ball.position.x).toBe(paddle.bottomLeft.x + paddle.width/2);
      });
    });
  });
  
  describe("stickBall", function(){
    it('moves the ball to the center of the paddle', function(){
      paddleController.stickBall();
      expect(ball.position.x).toBe(paddle.bottomLeft.x + paddle.width/2);
      expect(ball.position.y).toBe(paddle.bottomLeft.y - paddle.height);
    });
    
    it('sticks the ball', function(){
      paddleController.stickBall();
      expect(ball.isStuckToPaddle()).toBeTruthy();
    });
  });
});