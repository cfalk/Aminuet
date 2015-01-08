
// Create one global context.
var audioContext = new webkitAudioContext();


function playTone(tone, duration) {
  if (tone===undefined) throw "No tone specified!";

  // Largely based on code from: http://patorjk.com/blog/2012/07/22/tone-playing-experiment-with-html5s-web-audio-api/
  var gain = audioContext.createGain();
  var oscillator = audioContext.createOscillator();

  // Apply a gain so that the sound "fades" out.
  var decay = duration*0.8/1000;
  gain.connect(audioContext.destination)
  gain.gain.setValueAtTime(1, audioContext.currentTime);
  gain.gain.linearRampToValueAtTime(0.5, audioContext.currentTime+decay);
  gain.gain.linearRampToValueAtTime(0.2, audioContext.currentTime+duration/1000);

  oscillator.frequency.value = toneToFrequencyMap[tone];
  oscillator.type = "square";
  oscillator.connect(gain);
  oscillator.start(0);

  // Kill the sound after a certain duration.
  setTimeout(function() {
    oscillator.stop(0);
    oscillator.disconnect(gain);
    gain.disconnect(audioContext.destination);
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
