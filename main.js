(function(){
  var ballKinematicsUpdater = new BallKinematicsUpdater();
  var ball = {
    position: {x:0, y:0},
    velocity: {x: 5, y:10}
  };
  var stage = {
    width: 100,
    height: 500
  };
 
  var renderer = new DebugRenderer();
  var updateAndRender = function(){
    ball = ballKinematicsUpdater.update(ball, stage);
    renderer.renderBall(ball);
    console.log(ball.position.x, ball.position.y);
  }
    
  document.onreadystatechange = function(event){
    if(document.readyState == "complete"){
      renderer.render();
      var interval = window.setInterval(updateAndRender, 250);
  
  console.log("interval", interval);
  }};
})();