
// Create one global context.
var audioContext = new webkitAudioContext();


function playTone(tone, duration) {
  if (tone===undefined) throw "No tone specified!";

  // Largely based on code from: http://patorjk.com/blog/2012/07/22/tone-playing-experiment-with-html5s-web-audio-api/
  var oscillator = audioContext.createOscillator();
  oscillator.frequency.value = toneToFrequencyMap[tone];
  oscillator.type = "square";
  oscillator.connect(audioContext.destination);
  oscillator.noteOn && oscillator.noteOn(0);

  // Kill the sound after a certain duration.
  setTimeout(function() {
    oscillator.disconnect();
  }, duration);
}


function playTones(toneSeq, duration) {
  playTone(toneSeq.shift(), duration);
  setTimeout(function() {
    if (toneSeq.length) {
      playTones(toneSeq, duration);
    }
  }, duration);
}


function playSequence(seqContainer) {
  var $seqContainer = $(seqContainer);
  var duration = $seqContainer.data("duration");
  if (duration===undefined) duration = 1000;

  var soundSeq = $seqContainer.data("soundSeq").slice();
  playTones(soundSeq, duration);
}


function playAllSequences() {
  $(".sequence").each(function() {
    playSequence(this);
  });
}
