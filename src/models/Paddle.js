var Paddle = function(options){
  var stage = options.stage;
  this.height = options.height || 47;
  this.width = options.width || 125;
  this.bottomLeft = {x:stage.width/2 - this.width/2, y: stage.height};
};