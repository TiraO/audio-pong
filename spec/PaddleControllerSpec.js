describe("PaddleController", function(){
  var paddleController, paddle;
  beforeEach(function(){
    paddle = new Paddle({});
    paddleController = new PaddleController({paddle: paddle});
  });
  describe("moveRight", function(){
    it("increases the x coordinate of the paddle", function(){
      paddle.bottomLeft.x = 0;
      paddleController.moveRight(10);
      expect(paddle.bottomLeft.x).toBe(10);
    });
  });
  
  describe("moveLeft", function(){
    it("decreases the x coordinate of the paddle", function(){
      paddle.bottomLeft.x = 10;
      paddleController.moveLeft(10);
      expect(paddle.bottomLeft.x).toBe(0);
    });
  });
});