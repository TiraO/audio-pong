describe("BlockDestroyer", function(){
  var blockDestroyer, blocks, block1, block2;
  beforeEach(function(){
    block1 = new Block();
    block2 = new Block();
    blocks = [ block1, block2 ];    

    blockDestroyer = new BlockDestroyer({blocks: blocks});  
  });
  
  describe("removeDamagedBlocks", function(){
    describe("when there is a block collision", function(){
      var collisionSurfaces;
      beforeEach(function(){
        collisionSurfaces = [{type: 'BLOCK', block: block1}];
      });
      
      it("removes the block from the game", function(){
        blockDestroyer.removeDamagedBlocks(collisionSurfaces);
        expect(blocks).toEqual([block2]);
      });
      
      it("returns a list of what was destroyed", function(){
        expect(blockDestroyer.removeDamagedBlocks(collisionSurfaces)).toEqual(
          ['REGULAR_BLOCK_DESTROYED']
        );
      });
    });
    describe("when there are no block collisions", function(){
      var collisionSurfaces;
      beforeEach(function(){
        collisionSurfaces = [{type: 'GIBBLEDYGOOP'}];
      });
      
      it("does not remove any blocks from the game", function(){
        blockDestroyer.removeDamagedBlocks(collisionSurfaces);
        expect(blocks.length).toBe(2);
      });
      
      it("returns an empty list", function(){
        expect(blockDestroyer.removeDamagedBlocks(collisionSurfaces))
          .toEqual([]);
      });
    });
  });
});