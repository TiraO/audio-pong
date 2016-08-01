var SingletonContext = function(){
  this.ballKinematicsUpdater = new BallKinematicsUpdater();
  this.wallCollisionDetector = new WallCollisionDetector();
  this.paddleCollisionDetector = new PaddleCollisionDetector();
  this.stage = { width: 500, height: 500 };
  
  this.arrowControlledPaddle = new Paddle({stage: this.stage});
  this.arrowPaddleController = new PaddleController({paddle: this.arrowControlledPaddle});
  this.arrowKeyPaddleInput = new ArrowKeyPaddleInput({paddleController: this.arrowPaddleController});
  
  this.balls = [new Ball()];
};