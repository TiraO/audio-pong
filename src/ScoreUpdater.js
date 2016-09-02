var ScoreUpdater = function(){
  this.update = function(collisionSurfaces){
    var collisionTypes = _.pluck(collisionSurfaces, 'type');
    if(_.contains(collisionTypes, 'PADDLE')) {   
      singletonContext.playerScore ++;
    }
  };
};