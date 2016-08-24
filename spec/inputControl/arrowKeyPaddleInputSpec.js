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
    arrowKeyPaddleInput = new ArrowKeyPaddleInput({paddleController: paddleController, eventBus: new EventBus()});
  });

  describe("after the user presses the right arrow key", function(){
    beforeEach(function(){    
        var keyboardEvent = new KeyboardEvent("keydown", { code: "ArrowRight"});
      
        document.onkeydown(keyboardEvent); 
    });
    
    describe("every 15ms", function(){  
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
      it("stops moving the paddle", function(){

        spyOn(paddleController, "moveRight");
        
        document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowRight"}));
        jasmine.clock().tick(15);
        
        expect(paddleController.moveRight).not.toHaveBeenCalled();
      });
    });
    
    describe("when the user releases the left key", function() {
    
      it("does not stop moving the paddle", function() {
        spyOn(paddleController, "moveRight");
        
        document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowLeft"}));
        jasmine.clock().tick(15);
        
        expect(paddleController.moveRight).toHaveBeenCalled();
      });
      
    });
    
     
    describe("after the user presses the left arrow key", function(){
      beforeEach(function(){
        document.onkeydown(new KeyboardEvent("keydown", { code: "ArrowLeft"}));
      });
      
      it("begins to move left", function(){
        spyOn(paddleController, 'moveLeft');
        jasmine.clock().tick(15);
        expect(paddleController.moveLeft).toHaveBeenCalled();
      });
      
      describe("and the user releases the left arrow key", function(){
        beforeEach(function(){
           document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowLeft"}));
        });
        
        it("begins to move right again", function(){
          spyOn(paddleController, 'moveRight');
          jasmine.clock().tick(15);
          expect(paddleController.moveRight).toHaveBeenCalled();
        });
      });
    });
  });

  describe("after the user presses the left arrow key", function() {
    beforeEach(function(){    
        var keyboardEvent = new KeyboardEvent("keydown", { code: "ArrowLeft"});
      
        document.onkeydown(keyboardEvent); 
    });
    
    describe("every 15ms", function() {
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
    
    describe("when the user releases the arrowRight key", function() {
      beforeEach(function(){
        jasmine.clock().tick(30);
      });
      
      it("does not stop moving the paddle", function() {
        spyOn(paddleController, "moveLeft");
        
        document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowRight"}));
        jasmine.clock().tick(15);
        
        expect(paddleController.moveLeft).toHaveBeenCalled();
      });
    });
    
    describe("after the user presses the right arrow key", function(){
      beforeEach(function(){
        document.onkeydown(new KeyboardEvent("keydown", { code: "ArrowRight"}));
      });
      
      it("begins to move right", function(){
        spyOn(paddleController, 'moveRight');
        jasmine.clock().tick(15);
        expect(paddleController.moveRight).toHaveBeenCalled();
      });
      
      describe("and the user releases the right arrow key", function(){
        beforeEach(function(){
           document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowRight"}));
        });
        
        it("begins to move left again", function(){
          spyOn(paddleController, 'moveLeft');
          jasmine.clock().tick(15);
          expect(paddleController.moveLeft).toHaveBeenCalled();
        });
      });
    });
    describe("when the user presses and releases the right arrow key", function(){
      it("begins to move left again", function(){
        
      });
    });
  });
  
  describe("after the user presses both arrow keys", function(){
    beforeEach(function(){
        document.onkeydown(new KeyboardEvent("keydown", { code: "ArrowLeft"}));
      document.onkeydown(new KeyboardEvent("keydown", { code: "ArrowRight"}));
    });
    describe("and the paddle is moving right", function(){
      describe("when the user releases the left and then the right arrow key", function(){
        beforeEach(function(){
          document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowLeft"}));
          document.onkeyup(new KeyboardEvent("keyup", { code: "ArrowRight"}));
        });
        
        it("stops moving the paddle", function(){
          
         spyOn(paddleController, 'moveRight');
         spyOn(paddleController, 'moveLeft');
          jasmine.clock().tick(15);
          expect(paddleController.moveLeft).not.toHaveBeenCalled();
          expect(paddleController.moveRight).not.toHaveBeenCalled();
        });
      });
    });
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