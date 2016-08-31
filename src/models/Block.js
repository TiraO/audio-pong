var Block = function(options){
  options = options || {};
  this.height = options.height || 47;
  this.width = options.width || 125;
  this.bottomLeft = options.bottomLeft || {x:200 + 100*Math.random(), y:100 + 100*Math.random()};
};