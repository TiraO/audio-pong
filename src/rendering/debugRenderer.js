var DebugRenderer = function(){
  var pixiStage, graphics, renderer, scoreText;
  this.init = function(){
     renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true });
    document.body.appendChild(renderer.view);
    pixiStage = new PIXI.Container();
    graphics = new PIXI.Graphics();
    pixiStage.addChild(graphics);

    renderer.render(pixiStage);
  };
  
  this.render = function(stage, ball, paddle){
   
    graphics.clear();
    this.renderStage(stage);
    this.renderBallY(stage, ball);
    this.renderBall(ball);
    this.renderBallSound(stage, ball);
    this.renderPaddle(paddle);
    this.renderScore(singletonContext.playerScore);
    this.renderLives(singletonContext.lives);
    this.renderBlocks(singletonContext.blocks);
    
    graphics.endFill();
    renderer.render(pixiStage);
  };
  
  this.renderStage = function(stage){
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x02070B, 1);
    graphics.drawRect(0, 0, stage.width, stage.height);
  };
  
  this.renderBallSound = function(stage, ball){
    var audioRenderer = singletonContext.audioRenderer;
    audioRenderer.render(stage, ball);
  };
  
  this.renderBallY = function(stage, ball){
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0xFF700B, 1);
    graphics.drawRect(0, ball.position.y - 4, stage.width, 5);
  }
  
  this.renderPaddle = function(paddle){
    graphics.lineStyle(2, 0x0FF0FF, 1);
    graphics.beginFill(0xFF700B, 1);
    graphics.drawRect(paddle.bottomLeft.x, paddle.bottomLeft.y - paddle.height, paddle.width, paddle.height);

  };
  
  this.renderBlocks = function(blocks){
    _.each(blocks, this.renderBlock);
  };
  
  this.renderBlock = function(block){
    graphics.lineStyle(2, 0x0FF0FF, 1);
    graphics.beginFill(0xAA70B0, 1);
    graphics.drawRect(block.bottomLeft.x, block.bottomLeft.y - block.height, block.width, block.height);

  };
  
  this.renderBall = function(ball){
    var radius = 2;
    graphics.lineStyle(2, 0xFF00FF, 1);
    graphics.beginFill(0xFFFF0B);
    graphics.drawCircle(ball.position.x, ball.position.y, radius * 2);
    if(ball.normal){
      graphics.moveTo(ball.position.x, ball.position.y);
      graphics.lineTo(ball.position.x + ball.normal.x * 100, ball.position.y + ball.normal.y * 100);
    }
  };
  
  this.renderLives = function(lives){
    _.each(_.range(lives), function(i){
      var lifeBall = { 
        position: {x: 100 + 10*i, y: 100}
      };
      
      this.renderBall(lifeBall);
    }, this);
  };
  
  this.renderScore = function(score) {
    if(scoreText){
      scoreText.destroy();
    }
    scoreText = new PIXI.Text(score,{font : '24px Arial', fill : 0xff1010, align : 'center'});

    graphics.addChild(scoreText);
  }
}