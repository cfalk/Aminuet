
// Create one global context.
var audioContext = new webkitAudioContext();

function playTone(tone, duration) {
  // Largely based on code from: http://patorjk.com/blog/2012/07/22/tone-playing-experiment-with-html5s-web-audio-api/
  var oscillator = audioContext.createOscillator();
  oscillator.frequency.value = toneToFrequencyMap[tone];
  oscillator.connect(audioContext.destination);
  oscillator.noteOn && oscillator.noteOn(0);

  // Kill the sound after a certain duration.
  setTimeout(function() {
    oscillator.disconnect();
  }, duration);
}

function playTones(toneSeq, duration) {
  setTimeout(function() {
    playTone(toneSeq.shift(), duration);
    playTones(toneSeq, duration);
  }, duration);
}
