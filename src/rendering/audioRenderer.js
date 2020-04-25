var AudioRenderer = function () {
  this.loadState = {
    loading: false,
    loaded: false,
    waitingForInteraction: true
  };

  this.load = function ( songFileName ) {
    this.loadState.loading = true;
    var audioContext = singletonContext.audioContext;
    var source = singletonContext.audioSource = audioContext.createBufferSource();
    var request = new XMLHttpRequest();

    request.open('GET', '/assets/' + songFileName, true);

    request.responseType = 'arraybuffer';

    var audioRenderer = this;

    request.onload = function () {

      var audioData = request.response;
      audioContext.decodeAudioData(audioData, function ( buffer ) {
          audioRenderer.loadState.loading = false;
          audioRenderer.loadState.loaded = true;
          source.buffer = buffer;

          var splitter = audioContext.createChannelSplitter(2);
          var merger = audioContext.createChannelMerger(2);

          source.connect(splitter);
          var gainL = audioContext.createGain();
          var gainR = audioContext.createGain();
          splitter.connect(gainL, 0);
          splitter.connect(gainR, 1);
          gainL.gain.value = 0.5;
          gainR.gain.value = 0.5;
          audioRenderer.gainL = gainL;
          audioRenderer.gainR = gainR;
          gainL.connect(merger, 0, 1);
          gainR.connect(merger, 0, 0);
          merger.connect(audioContext.destination);
          source.loop = true;

          source.start();

        },

        function ( e ) {
          console.warn("Error with decoding audio data", e);
        });

    };

    request.send();
  };

  var audioRenderer = this;
  this.pan = function ( stage, ball ) {
    if (audioRenderer.loadState.loaded) {
      var fractionFromLeft = ball.position.x / stage.width;

      audioRenderer.gainR.gain.value = 1 - fractionFromLeft;
      audioRenderer.gainL.gain.value = (fractionFromLeft);
    }
  };

  this.render = function ( stage, ball ) {
    if (!this.loadState.loaded && !this.loadState.loading && !this.loadState.waitingForInteraction) {
      this.load(window.location.search.split("=")[1]);
    } else if (this.loadState.loaded) {
      this.pan(stage, ball);
    }
  };
}