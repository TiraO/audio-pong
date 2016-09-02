var BlockDestroyer = function(options){
  options = options || {};
  
  this.removeDamagedBlocks = function(collisionSurfaces){
    var blocks = options.blocks || singletonContext.blocks;
    var collidedBlocks = _.chain(collisionSurfaces)
      .filter({type: 'BLOCK'})
      .pluck('block')
      .value();
    
    var result = [];
    _.each(collidedBlocks, function(block){
      var index = blocks.indexOf(block)
      if(index >= 0){
        blocks.splice(index, 1);
        result.push('REGULAR_BLOCK_DESTROYED');
      }
    });
    return result;
  };
};