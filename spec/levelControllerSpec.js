describe("LevelController", function(){
  var levelController;
  beforeEach(function(){
    levelController = new LevelController();
  });

  describe("startLevel", function(){
    var firstLevelBlocks;
    beforeEach(function(){
      firstLevelBlocks = [ new Block(), new Block()];
      var levels = [
      {
        title: "Take it Block",
        blocks: firstLevelBlocks
      },
      {
        title: "Block Magic, Site Blocker, Blocked and Loaded, Blockout, I'll Be Block, Block to the Future, Microblocking, Site Blocker, Popup Blocker, Communist Block, Block Party, Blockchain, Block is Beautiful, Men in Block, Sunblock, Under Block and Key, Walkie Blockie",
        blocks: []
      }];
    });
    
    it("sets the level title", function(){
      levelController.startLevel(0);
      expect()
    });

    it("sticks the ball to the paddle", function(){
        spyOn(singletonContext.ballController, 'stickBallToPaddle');
        levelController.startLevel();
        expect(singletonContext.ballController.stickBallToPaddle).toHaveBeenCalled();
    });

    it("sets the blocks to the blocks for that level", function(){
      var originalBlocks = singletonContext.blocks;

      levelController.startLevel();

      expect(singletonContext.blocks).toBe(originalBlocks);
      expect(singletonContext.blocks).toInclude(firstLevelBlocks);
    });
  });
  
  describe("failLevel", function(){
    describe("when the player has gotten some points during the level", function(){
      it("resets those points");
    });
  });
});