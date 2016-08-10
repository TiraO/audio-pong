var ScoreUpdater = function(){
  this.update = function(collisionSurfaces){
    if(_.contains(collisionSurfaces, 'PADDLE')) {   
      singletonContext.playerScore ++;
    }
  };
};