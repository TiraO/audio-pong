var Ball = function(options){
  options = options || {};
  this.position = options.position || { x: 0, y: 0};
  this.velocity = options.velocity || { x: 1, y: 10};
  this.stuck = false;
  
  this.stickToPaddle = function(){
    this.stuck = true;
  };
  
  this.isStuckToPaddle = function(){
    return this.stuck;
  };
  
  this.setKinematics = function(kinematics){
    this.position = kinematics.position;
    this.velocity = kinematics.velocity;
  };
};