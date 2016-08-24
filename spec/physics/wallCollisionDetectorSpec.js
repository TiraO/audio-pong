describe("WallCollisionDetector", function(){
  var wallCollisionDetector, ball, stage;
  beforeEach(function(){
    wallCollisionDetector = new WallCollisionDetector(); 
    ball = {
          position: {x: 5, y: 11},
          velocity: {x: 10, y: 9}
    };
    stage = {
          width: 500,
          height: 600
    };
  });
  
  describe("detectCollisions", function(){
    it("returns an empty array", function() {
      var collisions = wallCollisionDetector.detectCollisions(ball, stage);
      expect(collisions).toEqual([]);
    });
        
    describe("when the ball is travelling past the left wall", function(){
      beforeEach(function(){
        ball.position.x = 2;
        ball.velocity.x = -11;
      });
      
      it("returns a collision", function(){
        var collisions = wallCollisionDetector.detectCollisions(ball, stage);
        expect(collisions.length).toBe(1);
      });
      
      describe("the collision", function(){
        var collision;
        beforeEach(function(){
            collision = wallCollisionDetector.detectCollisions(ball, stage)[0];
        });

        it("is tagged as a collision with the left wall", function() {
	        expect(collision.collisionSurface).toEqual('LEFT_WALL');
	      });
        
        
        
        it("has an x position of the left wall", function(){
          expect(collision.position.x).toEqual(0);
        });
        
        it("has an y position of the original y position plus the y velocity", function(){
          expect(collision.position.y).toEqual(20);
        });
        
        it("has the original y velocity", function(){
          expect(collision.velocity.y).toEqual(9);
        });
        
        it("has a reversed x velocity", function(){
          expect(collision.velocity.x).toEqual(11);
        });
      });
    });
    
        
    describe("when the ball is travelling past the right wall", function(){
      beforeEach(function(){
        ball.position.x = 495;
      });
      
      it("returns a collision", function(){
        var collisions = wallCollisionDetector.detectCollisions(ball, stage);
        expect(collisions.length).toBe(1);
      });
      
      describe("the collision", function(){
        var collision;
        beforeEach(function(){
            collision = wallCollisionDetector.detectCollisions(ball, stage)[0];
        });
        
        it("is tagged as a collision with the right wall", function() {
	        expect(collision.collisionSurface).toEqual('RIGHT_WALL');
	      });
        
        it("has an x position of the right wall", function(){
          expect(collision.position.x).toEqual(500);
        });
        
        it("has an y position of the original y position plus the y velocity", function(){
          expect(collision.position.y).toEqual(20);
        });
        
        it("has the original y velocity", function(){
          expect(collision.velocity.y).toEqual(9);
        });
        
        it("has a reversed x velocity", function(){
          expect(collision.velocity.x).toEqual(-10);
        });
      });
    });
    
    describe("when the ball is travelling past the top wall", function(){
      beforeEach(function(){
        ball.position.y = 2;
        ball.velocity.y = -11;
      });
      
      it("returns a collision", function(){
        var collisions = wallCollisionDetector.detectCollisions(ball, stage);
        expect(collisions.length).toBe(1);
      });
      
      describe("the collision", function(){
        var collision;
        beforeEach(function(){
            collision = wallCollisionDetector.detectCollisions(ball, stage)[0];
        });
        
        it("is tagged as a collision with the top wall", function() {
	        expect(collision.collisionSurface).toEqual('TOP_WALL');
	      });
        
        it("has an x position of the original velocity plus the original position", function(){
          expect(collision.position.x).toEqual(15);
        });
        
        it("has an y position of the top wall", function(){                      
          expect(collision.position.y).toEqual(0);
        });
        
        it("has the original x velocity", function(){
  expect(collision.velocity.x).toEqual(10);
        });
        
        it("has a reversed y velocity", function(){          expect(collision.velocity.y).toEqual(11);
                                                  });
      });
    });
    
    describe("when the ball is travelling past the bottom wall", function(){
      beforeEach(function(){
        ball.position.y = 595;
      });
      
      it("returns a collision", function(){
        var collisions = wallCollisionDetector.detectCollisions(ball, stage);
        expect(collisions.length).toBe(1);
      });
      
      describe("the collision", function(){
        var collision;
        beforeEach(function(){
            collision = wallCollisionDetector.detectCollisions(ball, stage)[0];
        });

        it("is tagged as a collision with the bottom wall", function() {
	        expect(collision.collisionSurface).toEqual('BOTTOM_WALL');
	      });
        
        it("has an x position of the original velocity plus the original position", function(){
          expect(collision.position.x).toEqual(15);
        });
        
        it("has an y position of the bottom wall", function(){                      
          expect(collision.position.y).toEqual(600);
        });
        
        it("has the original x velocity", function(){
          expect(collision.velocity.x).toEqual(10);
        });
        
        it("has a reversed y velocity", function(){
          expect(collision.velocity.y).toEqual(-9);
        });
      });
    });

  });
});
