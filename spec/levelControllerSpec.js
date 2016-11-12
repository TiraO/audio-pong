xdescribe("LevelController", function(){
  describe("startLevel", function(){
    beforeEach(function(){
      var levels = [{ 
        title: "Block Magic, Site Blocker, Blocked and Loaded, Blockout, I'll Be Block, Block to the Future, Microblocking, Site Blocker, Popup Blocker, Communist Block, Block Party, Blockchain, Block is Beautiful, Men in Block, Sunblock, Under Block and Key, Walkie Blockie",
        blocks: []
      }];
    });
    
    it("sets the level title");
    it("sticks the ball to the paddle");
    it("sets the blocks to the blocks for that level");
  });
  
  describe("failLevel", function(){
    describe("when the player has gotten some points during the level", function(){
      it("resets those points");
    });
  });
});