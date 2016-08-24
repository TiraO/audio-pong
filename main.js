(function(){
  window.singletonContext = new SingletonContext();
 
  singletonContext.ballController.stickBallToPaddle();
  
  var renderer = new DebugRenderer();
  var update = function(){
    singletonContext.gameRunner.runStep();
  }
  var rupdate = function(){
    update();
    requestAnimationFrame(rupdate);
  }
  var render = function(){
    var ball = singletonContext.ball;
    var stage = singletonContext.stage;
    var paddle = singletonContext.arrowControlledPaddle;
    renderer.render(stage, ball, paddle);
//    requestAnimationFrame(render);
  };
  
  document.onreadystatechange = function(event){
    if(document.readyState == "complete"){
      renderer.init();
      requestAnimationFrame(render);
//      requestAnimationFrame(rupdate);
      var interval = window.setInterval(update, 50);
      var interval2 = window.setInterval(render, 80);
  }};
})();