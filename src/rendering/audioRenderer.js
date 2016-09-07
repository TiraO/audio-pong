var AudioRenderer = function(){
  this.loadState = {
    loading: false,
    loaded: false
  };
  
  this.load = function(songFileName){
    this.loadState.loading = true;
    var audioContext = singletonContext.audioContext;
    var panner = singletonContext.audioPanner;
    var source = singletonContext.audioSource = audioContext.createBufferSource();
    request = new XMLHttpRequest();

    request.open('GET', '/assets/' + songFileName, true);

    request.responseType = 'arraybuffer';

    var audioRenderer = this;

    request.onload = function() {

      var audioData = request.response;
      audioContext.decodeAudioData(audioData, function(buffer) {
        audioRenderer.loadState.loading = false;
      audioRenderer.loadState.loaded = true;
          source.buffer = buffer;

          source.connect(panner);
          panner.connect(audioContext.destination);

          source.loop = true;
          source.start();
        },

        function(e){
        console.warn("Error with decoding audio data", e);
      });

    }

    request.send();
  };
  
  this.pan = function(stage, ball){
    singletonContext.audioPanner.pan.value = (2*ball.position.x / stage.width) - 1;
  };
  
  this.render = function(stage, ball){
    if(!this.loadState.loaded && !this.loadState.loading){
      this.load(window.location.search.split("=")[1]);
    } else if(this.loadState.loaded){
      this.pan(stage, ball);
    }
  };
}