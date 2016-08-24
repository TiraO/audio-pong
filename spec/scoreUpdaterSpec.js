describe("ScoreUpdater", function(){
  var scoreUpdater;
  beforeEach(function(){
    scoreUpdater = new ScoreUpdater();
  });
  describe("#update", function(){
    it('does not change the player score', function(){
      singletonContext.playerScore = 0;
        scoreUpdater.update(['LEFT_WALL', 'RIGHT_WALL']);
        expect(singletonContext.playerScore).toBe(0);
    });
    
    describe("when there is a collision with the paddle", function(){
      it("increments the player's score by 1", function(){
        singletonContext.playerScore = 1;
        scoreUpdater.update(['PADDLE']);
        expect(singletonContext.playerScore).toBe(2);
      });
    });
  });
});