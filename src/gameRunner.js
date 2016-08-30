var GameRunner = function(){
  this.runStep = function(){
    var scoreUpdater = singletonContext.scoreUpdater;
    var ballKinematicsUpdater = singletonContext.ballKinematicsUpdater;
    var kinematicsResult = ballKinematicsUpdater.update(singletonContext.ball, singletonContext.stage, singletonContext.arrowControlledPaddle);
    
    singletonContext.ball.setKinematics(kinematicsResult.ball);
    
    scoreUpdater.update(kinematicsResult.collisionSurfaces);
    
    if(this.didHitBottom(kinematicsResult)){
      singletonContext.lives--;
      singletonContext.ballController.stickBallToPaddle();
      if(singletonContext.lives == 0){
        this.resetGameState();
      }
    }
  };
  
  this.resetGameState = function(){
    singletonContext.lives = 3;
    singletonContext.playerScore = 0;
  };
  
  this.didHitBottom = function(kinematicsResult){
    return _.contains(kinematicsResult.collisionSurfaces, 'BOTTOM_WALL')
  };
};