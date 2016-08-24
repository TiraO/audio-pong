describe("SpacebarBallInput", function(){
  var spacebarBallInput, ballController, eventBus;
  beforeEach(function(){
    ballController = new BallController({ball: null, paddle:null});
    eventBus = new EventBus();
    spacebarBallInput = new SpacebarBallInput({ballController: ballController, eventBus: eventBus});
  });
  
  describe("when the user presses space", function(){
    var keyboardEvent;
    beforeEach(function(){
      keyboardEvent = new KeyboardEvent("keydown", { code: "Space"});
    });
    
    it("releases the ball", function(){
      spyOn(ballController, 'releaseBall');
      eventBus.receiveKeydownEvent(keyboardEvent);       
      expect(ballController.releaseBall).toHaveBeenCalled();
    });
  });
});