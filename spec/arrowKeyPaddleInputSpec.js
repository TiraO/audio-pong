describe("ArrowKeyPaddleInput", function(){
  var paddleController, arrowKeyPaddleInput;
  beforeEach(function(){
    paddleController = new PaddleController({paddle: new Paddle()});
    arrowKeyPaddleInput = new ArrowKeyPaddleInput({paddleController: paddleController});
  });

  describe("when the user presses the right arrow key", function(){
    it("moves the paddle right by 10", function(){
      spyOn(paddleController, "moveRight");
      var keyboardEvent = new KeyboardEvent("keydown", { code: "ArrowRight"});
      
      document.onkeydown(keyboardEvent);
      expect(paddleController.moveRight).toHaveBeenCalledWith(10);
    });
  });
  
  describe("when the user presses the left arrow key", function(){
    it("moves the paddle left by 10", function(){
      spyOn(paddleController, "moveLeft");
      var keyboardEvent = new KeyboardEvent("keydown", {code: "ArrowLeft"});
      
      document.onkeydown(keyboardEvent);
      expect(paddleController.moveLeft).toHaveBeenCalledWith(10);
    });
  });
  
  describe("when the user presses some other key", function(){
    it("does not move the paddle", function(){
      spyOn(paddleController, "moveRight");
      spyOn(paddleController, "moveLeft");
      var keyboardEvent = new KeyboardEvent("keydown", {code:"SomeOtherKey"});
      
      document.onkeydown(keyboardEvent);
      expect(paddleController.moveRight).not.toHaveBeenCalled();
      expect(paddleController.moveLeft).not.toHaveBeenCalled();
    });
  });
});