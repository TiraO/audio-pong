var Block = function(options){
  options = options || {};
  this.height = options.height || 47;
  this.width = options.width || 125;
  this.bottomLeft = options.bottomLeft || {x:10*Math.random(), y:10*Math.random()};
};