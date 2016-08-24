var GameRunner = function(){
  this.runStep = function(){
    var scoreUpdater = singletonContext.scoreUpdater;
    var ballKinematicsUpdater = singletonContext.ballKinematicsUpdater;
    var kinematicsResult = ballKinematicsUpdater.update(singletonContext.ball, singletonContext.stage, singletonContext.arrowControlledPaddle);

    singletonContext.ball.setKinematics(kinematicsResult.ball);
    
    scoreUpdater.update(kinematicsResult.collisionSurfaces);
  };
};