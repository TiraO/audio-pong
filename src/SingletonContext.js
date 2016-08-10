var SingletonContext = function(){
  this.ballKinematicsUpdater = new BallKinematicsUpdater();
  this.wallCollisionDetector = new WallCollisionDetector();
  this.paddleCollisionDetector = new PaddleCollisionDetector();
  this.stage = { width: 500, height: 500 };
  this.scoreUpdater = new ScoreUpdater();
  
  this.arrowControlledPaddle = new Paddle({stage: this.stage});
  this.arrowPaddleController = new PaddleController({paddle: this.arrowControlledPaddle});
  this.arrowKeyPaddleInput = new ArrowKeyPaddleInput({paddleController: this.arrowPaddleController});
  
  this.ball = ball = {
    position: {x:0, y:0},
    velocity: {x: 10, y:20}
  };
  this.playerScore = 0;
  
  this.audioContext =  window.acx = window.acx || new AudioContext();
  this.audioPanner = this.audioContext.createStereoPanner();
  this.audioRenderer = new AudioRenderer();
  
  this.gameRunner = new GameRunner();
};