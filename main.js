(function(){
  var ballKinematicsUpdater = new BallKinematicsUpdater(new WallCollisionDetector(), new PaddleCollisionDetector());
  var ball = {
    position: {x:0, y:0},
    velocity: {x: 5, y:10}
  };
  var stage = {
    width: 500,
    height: 500
  };
  var paddle = new Paddle({stage: stage});
 
  var renderer = new DebugRenderer();
  var update = function(){
    ball = ballKinematicsUpdater.update(ball, stage, paddle);
  }
  var render = function(){
    renderer.render(stage, ball, paddle);
    requestAnimationFrame(render);
  };
  
  document.onreadystatechange = function(event){
    if(document.readyState == "complete"){
      renderer.init();
      requestAnimationFrame(render);
      var interval = window.setInterval(update, 15);
  
  console.log("interval", interval);
  }};
})();