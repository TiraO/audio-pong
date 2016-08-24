var SpacebarBallInput = function(options){
  var eventBus = options.eventBus;
  var ballController = options.ballController;
  
  var bindInput = function(){
    eventBus.listenForKeydown(InputIdentifiers.SPACE, function(){
      ballController.releaseBall();
    });
  }
  
  bindInput();
};