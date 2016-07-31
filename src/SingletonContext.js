var SingletonContext = function(){
  this.ballKinematicsUpdater = new BallKinematicsUpdater();
  this.wallCollisionDetector = new WallCollisionDetector();
  this.paddleCollisionDetector = new PaddleCollisionDetector();
  this.stage = { width: 500, height: 500 };
  this.paddles = [new Paddle()];
  this.balls = [new Ball()];
};