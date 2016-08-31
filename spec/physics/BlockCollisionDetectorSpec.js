describe("BlockCollisionDetector", function(){
  var blockCollisionDetector;
  beforeEach(function(){
    blockCollisionDetector = new BlockCollisionDetector();
  });
  
  describe("detectCollision", function(){
    var block, ball;
    beforeEach(function(){
      block = new Block({height: 5, width: 10, bottomLeft: {x: 200, y: 100}});
      ball = new Ball();
      ball.position = { x: 202, y: 90 };
      ball.velocity = { x: 1, y: 7};
    });

    it("returns a collision", function(){
      expect(blockCollisionDetector.detectCollision(ball, block)).not.toBeNull();
    });
    
    describe("the collision", function(){
      var collision;
      beforeEach(function(){
        collision = blockCollisionDetector.detectCollision(ball, block);
      });

      it('has a collisionSurface of BLOCK', function(){
        expect(collision.collisionSurface).toBe('BLOCK');
      });
      
      describe("when the ball hits the top of the block", function(){
        beforeEach(function(){
          ball.position = { x: 195, y: 90 }; // (5, 5) from top left
          ball.velocity = { x: 9, y: 6 };
          
          collision = blockCollisionDetector.detectCollision(ball, block);
        });
        
        it("has a reversed y speed", function(){
          expect(collision.ball.velocity.y).toBe(-6);
        });
        
        it("has the original x speed", function(){
          expect(collision.ball.velocity.x).toBe(9);
        });
        
        it("has an x position incremented by the x speed", function(){
          expect(collision.ball.position.x).toBe(204);
        });
        
        it("has a y position of the top of the block", function(){
          expect(collision.ball.position.y).toBe(95);
        });
      });
      
      describe("when the ball hits the bottom of the block", function(){
        beforeEach(function(){
          ball.position = { x: 195, y: 105 }; // (5, -5) from bottom left
          ball.velocity = { x: 9, y: -6 };
          
          collision = blockCollisionDetector.detectCollision(ball, block);
        });
        
        it("has a reversed y speed", function(){
          expect(collision.ball.velocity.y).toBe(6);
        });
        
        it("has the original x speed", function(){
          expect(collision.ball.velocity.x).toBe(9);
        });
        
        it("has an x position incremented by the x speed", function(){
          expect(collision.ball.position.x).toBe(204);
        });
        
        it("has a y position of the bottom of the block", function(){
          expect(collision.ball.position.y).toBe(100);
        });
      });
      
      describe("when the ball hits the left side of the block", function(){
        beforeEach(function(){
          ball.position = { x: 195, y: 105 }; // (5, -5) from bottom left
          ball.velocity = { x: 6, y: -9 };
          
          collision = blockCollisionDetector.detectCollision(ball, block);
        });
        
        it("has a reversed x speed", function(){
          expect(collision.ball.velocity.x).toBe(-6);
        });
        
        it("has the original y speed", function(){
          expect(collision.ball.velocity.y).toBe(-9);
        });
        
        it("has a y position incremented by the y speed", function(){
          expect(collision.ball.position.y).toBe(96);
        });
        
        it("has an x position of the left of the block", function(){
          expect(collision.ball.position.x).toBe(200);
        });
      });
    });
    
    describe("when the ball will be to the right of the block", function(){
      beforeEach(function(){
        ball.position.x = 230;
        block.bottomLeft.x = 200;
        block.width = 30;
      });
      
      it("returns null", function(){
         expect(blockCollisionDetector.detectCollision(ball, block)).toBeNull();
      });
    });
    
    describe("when the ball will be to the left of the block", function(){
      beforeEach(function(){
        ball.position.x = 0;
      });
      
      it("returns null", function(){
         expect(blockCollisionDetector.detectCollision(ball, block)).toBeNull();
      });
    });

    describe("when the ball will be above the block", function(){
      beforeEach(function(){
        ball.position.y = 0;
      });
      
      it("returns null", function(){
         expect(blockCollisionDetector.detectCollision(ball, block)).toBeNull();
      });
    });

    describe("when the ball will be below block", function(){
      beforeEach(function(){
        ball.position.y = 650;
      });
      
      it("returns null", function(){
         expect(blockCollisionDetector.detectCollision(ball, block)).toBeNull();
      });
    });
  });
});