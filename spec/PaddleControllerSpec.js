describe("PaddleController", function(){
  var paddleController, paddle, stage;
  beforeEach(function(){
    paddle = new Paddle({ width: 10 });
    stage = new Stage({width: 100});
    paddleController = new PaddleController({paddle: paddle, stage: stage});
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
  });
});