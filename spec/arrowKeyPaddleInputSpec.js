describe("ArrowKeyPaddleInput", function(){
  var paddleController, arrowKeyPaddleInput;
  beforeEach(function() {
      jasmine.clock().install();
  });
    
  afterEach(function(){
    jasmine.clock().uninstall();
  });
  
  beforeEach(function(){
    paddleController = new PaddleController({paddle: new Paddle()});
    arrowKeyPaddleInput = new ArrowKeyPaddleInput({paddleController: paddleController});
  });

  describe("after the user presses the right arrow key", function(){
    describe("every 15ms", function(){
      beforeEach(function(){    
        var keyboardEvent = new KeyboardEvent("keydown", { code: "ArrowRight"});
      
        document.onkeydown(keyboardEvent); 
      });
      
      it("moves the paddle right", function(){
        spyOn(paddleController, "moveRight");
        
        jasmine.clock().tick(15);
        expect(paddleController.moveRight).toHaveBeenCalled();
        expect(paddleController.moveRight.calls.count()).toBe(1);

        jasmine.clock().tick(15);
        expect(paddleController.moveRight.calls.count()).toBe(2);
      });
    });
    
    describe("when the user releases the right arrow key again", function(){
      var rightKeydownEvent;
      beforeEach(function(){
        rightKeydownEvent = new KeyboardEvent("keydown", { code: "ArrowRight"});
      
        document.onkeydown(rightKeydownEvent);
        jasmine.clock().tick(30);
      });
      
      it("stops moving the paddle", function(){

        spyOn(paddleController, "moveRight");  document.onkeydown(rightKeydownEvent);
        
        document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowRight"}));
        jasmine.clock().tick(15);
        
        expect(paddleController.moveRight).not.toHaveBeenCalled();
      });
    });
  });

  describe("after the user presses the left arrow key", function() {
    describe("every 15ms", function() {
       beforeEach(function(){    
        var keyboardEvent = new KeyboardEvent("keydown", { code: "ArrowLeft"});
      
        document.onkeydown(keyboardEvent); 
      });
      
      it("moves the paddle left", function(){
        spyOn(paddleController, "moveLeft");
        
        jasmine.clock().tick(15);
        expect(paddleController.moveLeft).toHaveBeenCalled();
        expect(paddleController.moveLeft.calls.count()).toBe(1);

        jasmine.clock().tick(15);
        expect(paddleController.moveLeft.calls.count()).toBe(2);
      });
    });
    
     describe("when the user releases the left arrow key", function(){
      beforeEach(function(){
        jasmine.clock().tick(30);
      });
      
      it("stops moving the paddle", function(){
        spyOn(paddleController, "moveLeft");
        
        document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowLeft"}));
        jasmine.clock().tick(15);
        
        expect(paddleController.moveLeft).not.toHaveBeenCalled();
      });
    });
    
    xdescribe("when the user releases a different key", function() {
      beforeEach(function(){
        jasmine.clock().tick(30);
      });
      
      it("does not stop moving the paddle", function() {
        spyOn(paddleController, "moveLeft");
        
        document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowRight"}));
        jasmine.clock().tick(15);
        
        expect(paddleController.moveLeft).toHaveBeenCalled();
      });
    })
  });
  
 
  describe("when the user presses some other key", function(){
    it("does not start moving the paddle", function(){
      spyOn(paddleController, "moveRight");
      spyOn(paddleController, "moveLeft");
      var keyboardEvent = new KeyboardEvent("keydown", {code:"SomeOtherKey"});
      
      document.onkeydown(keyboardEvent);
      jasmine.clock().tick(100);
        
      expect(paddleController.moveRight).not.toHaveBeenCalled();
      expect(paddleController.moveLeft).not.toHaveBeenCalled();
    });
  });
});