var SingletonContext = function(){
  this.ballKinematicsUpdater = new BallKinematicsUpdater();
  this.wallCollisionDetector = new WallCollisionDetector();
  this.paddleCollisionDetector = new PaddleCollisionDetector();
  this.blockCollisionDetector = new BlockCollisionDetector();
  this.geometryHelper = new GeometryHelper();
  this.stage = { width: 500, height: 500 };
  this.scoreUpdater = new ScoreUpdater();
  this.ball = ball = new Ball();
  this.blocks = [new Block(), new Block()];
  this.lives = 3;
  this.eventBus = new EventBus();
  
  this.arrowControlledPaddle = new Paddle({stage: this.stage});
  
  this.ballController = new BallController({ball: ball, paddle: this.arrowControlledPaddle});
  this.spacebarBallInput = new SpacebarBallInput({ballController: this.ballController, eventBus: this.eventBus});
  
  this.arrowPaddleController = new PaddleController({paddle: this.arrowControlledPaddle, ball: ball});
  this.arrowKeyPaddleInput = new ArrowKeyPaddleInput({paddleController: this.arrowPaddleController, eventBus: this.eventBus});
  
  
  this.playerScore = 0;
  
  this.audioContext =  window.acx = window.acx || (window.AudioContext? new AudioContext(): new webkitAudioContext());
  this.audioPanner = this.audioContext.createStereoPanner();
  this.audioRenderer = new AudioRenderer();
  
  this.gameRunner = new GameRunner();
};