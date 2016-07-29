var DebugRenderer = function(){
  var pixiStage, graphics, renderer;
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
    this.renderBall(ball);
    this.renderPaddle(paddle);
    
    graphics.endFill();
    renderer.render(pixiStage);
  };
  
  this.renderStage = function(stage){
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x12700B, 1);
    graphics.drawRect(0, 0, stage.width, stage.height);
  };
  
  this.renderPaddle = function(paddle){
    graphics.lineStyle(2, 0x0FF0FF, 1);
    graphics.beginFill(0xFF700B, 1);
    graphics.drawRect(paddle.bottomLeft.x, paddle.bottomLeft.y - paddle.height, paddle.width, paddle.height);

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
}