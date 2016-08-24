describe("Ball", function(){
  var ball;
  beforeEach(function(){
    ball = new Ball();
  });
  
  describe("setKinematics", function(){
    var kinematics;
    beforeEach(function(){
      kinematics = {
        position: 'new ball position',
        velocity: 'new ball velocity'
      };
    });
    
    it("sets the position", function(){
      ball.setKinematics(kinematics);    
      expect(ball.position).toBe("new ball position");
    });
    
    it('sets the velocity', function(){
      ball.setKinematics(kinematics);
      expect(ball.velocity).toBe('new ball velocity');
    });
  });
});