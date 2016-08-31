describe("PaddleCollisionDetector", function(){
  var paddleCollisionDetector, ball, paddle;
  beforeEach(function(){
    ball = new Ball();
    paddle = new Paddle({
      stage: {height: 600}});
    paddleCollisionDetector = new PaddleCollisionDetector();
  });
  describe("detectCollision", function(){
    beforeEach(function(){
      ball.position = { x: 200, y:590};
      ball.velocity = { x: 1, y: 7};
      paddle.bottomLeft = { x: 198, y: 600};
      paddle.height = 5;
    });

    it("returns a collision", function(){
      expect(paddleCollisionDetector.detectCollision(ball, paddle)).not.toBeNull();
    });
    
    describe("the collision", function(){
      var collision;
      beforeEach(function(){
        collision = paddleCollisionDetector.detectCollision(ball, paddle);
      });

      it('has a collisionSurface of PADDLE', function(){
        expect(collision.collisionSurface).toBe('PADDLE');
      });
      it("has an x position of the original x plus x speed", function(){
        expect(collision.position.x).toBe(201);
      });
      
      it("has a y position of the top of the paddle", function(){
        expect(collision.position.y).toBe(595);
      });
      describe("when the ball hits the center of the paddle", function(){
        beforeEach(function(){
          paddle.bottomLeft.x = 200;
          paddle.width = 10;
          ball.position.x = 204;
          collision = paddleCollisionDetector.detectCollision(ball, paddle);  
        });
        
        it("reverses its y direction", function(){
          expect(collision.velocity.y).toBe( -7);
        });
        
        it("maintains the same x speed", function(){
          expect(collision.velocity.x).toBe(1);
        });
      });
      
      describe("when the ball hits left of center", function(){
        var collision;
        beforeEach(function(){
          paddle.bottomLeft.x = 200;
          paddle.width = 30;
          ball.position.x = 202;
          collision = paddleCollisionDetector.detectCollision(ball, paddle);  
        });
        it("gets deflected leftward", function(){
          expect(collision.velocity.x).toBeLessThan(1);
        });
          
        it("maintains the same total speed", function(){
          var originalTotalSpeed = Math.sqrt(
            ball.velocity.x*ball.velocity.x + ball.velocity.y *ball.velocity.y);
          var newTotalSpeed = Math.sqrt(
            collision.velocity.x*collision.velocity.x + collision.velocity.y *collision.velocity.y);
          
          expect(newTotalSpeed).toBeCloseTo(originalTotalSpeed);
          
        });
      });
    });
    
    describe("when the ball will be to the right of the paddle", function(){
      beforeEach(function(){
        ball.position.x = 230;
        paddle.bottomLeft.x = 200;
        paddle.width = 30;
      });
      
      it("returns null", function(){
         expect(paddleCollisionDetector.detectCollision(ball, paddle)).toBeNull();
      });
    });
    
    describe("when the ball will be to the left of the paddle", function(){
      beforeEach(function(){
        ball.position.x = 0;
      });
      
      it("returns null", function(){
         expect(paddleCollisionDetector.detectCollision(ball, paddle)).toBeNull();
      });
    });

    describe("when the ball will be above the paddle", function(){
      beforeEach(function(){
        ball.position.y = 0;
      });
      
      it("returns null", function(){
         expect(paddleCollisionDetector.detectCollision(ball, paddle)).toBeNull();
      });
    });

    describe("when the ball will be below paddle", function(){
      beforeEach(function(){
        ball.position.y = 650;
      });
      
      it("returns null", function(){
         expect(paddleCollisionDetector.detectCollision(ball, paddle)).toBeNull();
      });
    });
  });
});

