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
    
    describe("when the user releases and presses the right arrow key again", function(){
      var rightKeydownEvent;
      beforeEach(function(){
        rightKeydownEvent = new KeyboardEvent("keydown", { code: "ArrowRight"});
      
        document.onkeydown(rightKeydownEvent);
        document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowRight"}));
      });
      
      it("moves the paddle right by 10", function(){
        spyOn(paddleController, "moveRight");  document.onkeydown(rightKeydownEvent);
        expect(paddleController.moveRight).toHaveBeenCalledWith(10);
      });
    });
    
    describe("every 15ms", function(){
      beforeEach(function(){    
        var keyboardEvent = new KeyboardEvent("keydown", { code: "ArrowRight"});
      
        jasmine.clock().install();
        document.onkeydown(keyboardEvent); 
      });
      
      afterEach(function(){
        jasmine.clock().uninstall();
      });
      
      it("moves the paddle right again", function(){
       
        spyOn(paddleController, "moveRight");
        
        jasmine.clock().tick(15);
        expect(paddleController.moveRight).toHaveBeenCalled();
        expect(paddleController.moveRight.calls.count()).toBe(1);

        jasmine.clock().tick(15);
        expect(paddleController.moveRight.calls.count()).toBe(2);
      });
    });
  });
  
  describe("when the keydown event repeats", function(){
    it("does not move the paddle", function(){
      var keyboardEvent = new KeyboardEvent("keydown", { code: "ArrowRight"});
      
      document.onkeydown(keyboardEvent);
      spyOn(paddleController, "moveRight");
      document.onkeydown(keyboardEvent);
      expect(paddleController.moveRight).not.toHaveBeenCalled();
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