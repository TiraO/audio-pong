(function(){
  window.singletonContext = new SingletonContext();
  
  var ballKinematicsUpdater = new BallKinematicsUpdater({
      wallCollisionDetector: new WallCollisionDetector(), 
      paddleCollisionDetector: new PaddleCollisionDetector()});
  var ball = {
    position: {x:0, y:0},
    velocity: {x: 10, y:20}
  };
 
  var stage = singletonContext.stage;
  var paddle = singletonContext.arrowControlledPaddle;
 
  var renderer = new DebugRenderer();
  var update = function(){
    ball = ballKinematicsUpdater.update(ball, stage, paddle);
  }
  var rupdate = function(){
    update();
    requestAnimationFrame(rupdate);
  }
  var render = function(){
    renderer.render(stage, ball, paddle);
    requestAnimationFrame(render);
  };
  
  document.onreadystatechange = function(event){
    if(document.readyState == "complete"){
      renderer.init();
      requestAnimationFrame(render);
//      requestAnimationFrame(rupdate);
      var interval = window.setInterval(update, 50);
  }};
})();