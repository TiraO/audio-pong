var DebugRenderer = function(){
  var stage, graphics, renderer;
  this.init = function(){
     renderer = PIXI.autoDetectRenderer(800, 600, { antialias: true });
    document.body.appendChild(renderer.view);
    stage = new PIXI.Container();
    graphics = new PIXI.Graphics();

   
    stage.addChild(graphics);
    renderer.render(stage);
  };
  this.renderStage = function(stage){
    graphics.lineStyle(2, 0x0000FF, 1);
    graphics.beginFill(0x12700B, 1);
    graphics.drawRect(0, 0, stage.width, stage.height);

  }
  this.render = function(stage, ball){
    graphics.clear();
    this.renderStage(stage);
    this.renderBall(ball);
  };
  this.renderBall = function(ball){
    var radius = 5;
    graphics.lineStyle(2, 0xFF00FF, 1);
    graphics.beginFill(0xFFFF0B);
    graphics.drawCircle(ball.position.x, ball.position.y, radius * 2);
    graphics.endFill();
    renderer.render(stage);
  };
}