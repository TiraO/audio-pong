describe("BallController", function(){
  var ball, ballController, paddle;
  beforeEach(function(){
    ball = new Ball();
    paddle = new Paddle();
    ballController = new BallController({ball: ball, paddle: paddle});
  });
  
  describe("releaseBall", function(){
    beforeEach(function(){
      ball.stuck = true;
    });
    
    it("sets the stuck state on the ball to false", function(){
      ballController.releaseBall();
      expect(ball.stuck).toBe(false);
    });
  });
  
  describe("stickBallToPaddle", function(){
    it("sets the stuck state on the ball to true", function(){
      ballController.stickBallToPaddle();
      expect(ball.stuck).toBe(true);
    });
    
    it("places the ball on the paddle", function(){
      ballController.stickBallToPaddle();
      expect(ball.position.x).toEqual(paddle.bottomLeft.x + paddle.width/2);
      expect(ball.position.y).toEqual(paddle.bottomLeft.y - paddle.height);
    });
  });
});