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
        var geometryHelper;
        beforeEach(function(){
          ball.velocity = { x: 9, y: 6 };
          
          geometryHelper = singletonContext.geometryHelper;
          spyOn(geometryHelper, 'pointIsInsideRectangle').and.returnValue(true);
          spyOn(geometryHelper, 'pointIsAboveRectangle').and.returnValue(true);
          spyOn(geometryHelper, 'pointIsBelowRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'pointIsLeftOfRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'pointIsRightOfRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'findLineIntersection').and.returnValue({
            segmentsIntersect: true,
            x: 100,
            y: 200
          });

          collision = blockCollisionDetector.detectCollision(ball, block);
        });
        
        it("has a reversed y speed", function(){
          expect(collision.velocity.y).toBe(-6);
        });
        
        it("has the original x speed", function(){
          expect(collision.velocity.x).toBe(9);
        });
        
        it("is positioned at the intersection with the top of the block", function(){
          expect(collision.position).toEqual({ x: 100, y: 200 });
          expect(geometryHelper.findLineIntersection).toHaveBeenCalledWith(
            {x: 200, y: 95}, {x: 210, y: 95}, { x: 202, y: 90 }, { x: 211, y: 96 }
          );
        });
      });
      
      describe("when the ball hits the bottom of the block", function(){
        var geometryHelper;
        beforeEach(function(){
          ball.velocity = { x: 9, y: 6 };
          
          geometryHelper = singletonContext.geometryHelper;
          spyOn(geometryHelper, 'pointIsInsideRectangle').and.returnValue(true);
          spyOn(geometryHelper, 'pointIsAboveRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'pointIsBelowRectangle').and.returnValue(true);
          spyOn(geometryHelper, 'pointIsLeftOfRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'pointIsRightOfRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'findLineIntersection').and.returnValue({
            segmentsIntersect: true,
            x: 100,
            y: 200
          });

          collision = blockCollisionDetector.detectCollision(ball, block);
        });
        
        it("has a reversed y speed", function(){
          expect(collision.velocity.y).toBe(-6);
        });
        
        it("has the original x speed", function(){
          expect(collision.velocity.x).toBe(9);
        });
        
        it("is positioned at the intersection with the bottom of the block", function(){
          expect(collision.position).toEqual({ x: 100, y: 200 });
          expect(geometryHelper.findLineIntersection).toHaveBeenCalledWith(
            {x: 200, y: 100}, {x: 210, y: 100}, { x: 202, y: 90 }, { x: 211, y: 96 }
          );
        });
      });
      
      describe("when the ball hits the left side of the block", function(){
        var geometryHelper;
        beforeEach(function(){
          ball.velocity = { x: 9, y: 6 };
          
          geometryHelper = singletonContext.geometryHelper;
          spyOn(geometryHelper, 'pointIsInsideRectangle').and.returnValue(true);
          spyOn(geometryHelper, 'pointIsAboveRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'pointIsBelowRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'pointIsLeftOfRectangle').and.returnValue(true);
          spyOn(geometryHelper, 'pointIsRightOfRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'findLineIntersection').and.returnValue({
            segmentsIntersect: true,
            x: 100,
            y: 200
          });

          collision = blockCollisionDetector.detectCollision(ball, block);
        });
        
        it("has a reversed x speed", function(){
          expect(collision.velocity.x).toBe(-9);
        });
        
        it("has the original y speed", function(){
          expect(collision.velocity.y).toBe(6);
        });
        
        it("is positioned at the intersection with the left of the block", function(){
          expect(collision.position).toEqual({ x: 100, y: 200 });
          expect(geometryHelper.findLineIntersection).toHaveBeenCalledWith(
            {x: 200, y: 100}, {x: 200, y: 95}, { x: 202, y: 90 }, { x: 211, y: 96 }
          );
        });
      });
      
      describe("when the ball hits the right side of the block", function(){
        var geometryHelper;
        beforeEach(function(){
          ball.velocity = { x: 9, y: 6 };
          
          geometryHelper = singletonContext.geometryHelper;
          spyOn(geometryHelper, 'pointIsInsideRectangle').and.returnValue(true);
          spyOn(geometryHelper, 'pointIsAboveRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'pointIsBelowRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'pointIsLeftOfRectangle').and.returnValue(false);
          spyOn(geometryHelper, 'pointIsRightOfRectangle').and.returnValue(true);
          spyOn(geometryHelper, 'findLineIntersection').and.returnValue({
            segmentsIntersect: true,
            x: 100,
            y: 200
          });

          collision = blockCollisionDetector.detectCollision(ball, block);
        });
        
        it("has a reversed x speed", function(){
          expect(collision.velocity.x).toBe(-9);
        });
        
        it("has the original y speed", function(){
          expect(collision.velocity.y).toBe(6);
        });
        
        it("is positioned at the intersection with the right of the block", function(){
          expect(collision.position).toEqual({ x: 100, y: 200 });
          expect(geometryHelper.findLineIntersection).toHaveBeenCalledWith(
            {x: 210, y: 100}, {x: 210, y: 95}, { x: 202, y: 90 }, { x: 211, y: 96 }
          );
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