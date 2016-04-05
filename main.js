(function(){
  var ballKinematicsUpdater = new BallKinematicsUpdater();
  var ball = {
    position: {x:0, y:0},
    velocity: {x: 5, y:10}
  };
  var stage = {
    width: 500,
    height: 500
  };
 
  var renderer = new DebugRenderer();
  var update = function(){
    ball = ballKinematicsUpdater.update(ball, stage);
    console.log(ball.position.x, ball.position.y);
  }
  var render = function(){
    renderer.renderBall(ball);
    requestAnimationFrame(render);
  };
  
  document.onreadystatechange = function(event){
    if(document.readyState == "complete"){
      renderer.render();
      requestAnimationFrame(render);
      var interval = window.setInterval(update, 65);
  
  console.log("interval", interval);
  }};
})();