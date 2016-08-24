describe("EventBus", function(){
  var eventBus;
  beforeEach(function(){
    eventBus = new EventBus();
  });
  
  describe("listenForKeydown", function(){
    describe("afterwards,", function(){
      var listenerSpy;
      beforeEach(function(){
        listenerSpy = jasmine.createSpy("arrowRightListenerSpy");
        eventBus.listenForKeydown("ArrowRight", listenerSpy);
      });
      
      describe(" when the user presses that key", function(){
        it("calls the callback with the event", function(){
          var keyboardEvent = new KeyboardEvent("keydown", { code: "ArrowRight"});

          document.onkeydown(keyboardEvent); 
          expect(listenerSpy).toHaveBeenCalledWith(keyboardEvent);
        });
      });
      
      describe("when the user presses a different key", function(){
        it("does not call the callback", function(){
          var keyboardEvent = new KeyboardEvent("keydown", { code: "ArrowLeft"});

          document.onkeydown(keyboardEvent); 
          expect(listenerSpy).not.toHaveBeenCalled();
        });
      });
    });
  });
});