var LevelController = function () {
  this.startLevel = function ( levelIndex ) {
    singletonContext.blocks = this.levels[levelIndex].blocks;
    singletonContext.ballController.stickBallToPaddle();
    // singletonContext.
  };

  this.levels = [
    {
      title: "Block Magic, Site Blocker, Blocked and Loaded, Blockout, I'll Be Block, Block to the Future, Microblocking, Block for More, Popup Blocker, Communist Block, Block Party, Blockchain, Can't Block Out Now, Block is Beautiful, Men in Block, Sunblock, Under Block and Key, Walkie Blockie",
      blocks: [ new Block(), new Block(), new Block() ]
    },

  ]

};