describe("AudioRenderer", function(){
  var audioRenderer;
  beforeEach(function(){
    audioRenderer = new AudioRenderer();
  });
  describe("load", function(){
    describe("when passed a file path", function(){
      it("requests the audio file", function(){
        jasmine.Ajax.install();
        
        audioRenderer.load('some-file.mp3');
        
        expect(jasmine.Ajax.requests.mostRecent().url).toBe('/assets/some-file.mp3');
        
        jasmine.Ajax.uninstall();
      });
    });
    
    describe("when the audio file loads", function(){
      it("decodes the audio data");
    });
  });
  
});