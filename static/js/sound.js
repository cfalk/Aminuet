
// Create one global context.
var audioContext = new webkitAudioContext();


function playTone(tone, duration) {
  if (tone===undefined) throw "No tone specified!";
  if (tone==="--") return []; // "--" is used to indicate a rest.

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
    killOscillator(oscillator, gain);
  }, duration);

  // Return the oscillator/gain so it can be killed outside this function.
  return [oscillator, gain]
}

function killOscillator(osc, gain) {
  osc.stop(0);
  osc.disconnect(gain);
  gain.disconnect(audioContext.destination);
}

function stopSequence(seqContainer) {
  var $seqContainer = $(seqContainer);
  try {
    var osc = $seqContainer.data("oscillator");
    var gain = $seqContainer.data("gain");
    killOscillator(osc, gain);
  } catch (err) {
    // Oscillator is already killed.
  }

  // Turn the stop button into a play button.
  $seqContainer.find(".button-stop").removeClass("button-stop")
                                       .addClass("button-play");

  clearTimeout($seqContainer.data("nextTone"));
  clearVisual($seqContainer);
}

function playTones(toneSeq, duration, $seqContainer) {
  var tone = toneSeq.shift();
  var toneTuple = playTone(tone, duration);

  var nextTone = setTimeout(function() {
    if (toneSeq.length) {
      playTones(toneSeq, duration, $seqContainer);
    } else if ($seqContainer!==undefined) {
      var loop = $seqContainer.find(".button-loop").hasClass("active");
      if (loop) {
        playSequence($seqContainer);
      } else {
        stopSequence($seqContainer);
      }
    }
  }, duration);

  // If a `.sequence` is passed, store the current state of it.
  if ($seqContainer!==undefined) {
    stepVisual($seqContainer);
    $seqContainer.find(".button-play").removeClass("button-play")
                                      .addClass("button-stop");
    $seqContainer.data("oscillator", toneTuple[0]);
    $seqContainer.data("gain", toneTuple[1]);
    $seqContainer.data("nextTone", nextTone);
  }
}


function playSequence(seqContainer) {
  var $seqContainer = $(seqContainer);

  // Calculate the duration of each note in this sequence.
  var bpm = $seqContainer.find(".bpm").val();
  if (bpm===undefined) bpm = 60;
  var duration = 60/bpm*1000 // In milliseconds.

  try {
    var soundSeq = $seqContainer.data("soundSeq").slice();
    playTones(soundSeq, duration, $seqContainer);
  } catch(err) {
    console.log(err);
  }
}

function stopAllSequences() {
  $(".sequence").each(function() {
    stopSequence($(this));
  });
}

function playAllSequences() {
  $(".sequence").each(function() {
    // Play any sequences that are not already playing.
    if ($(this).find(".button-play").length){
      playSequence(this);
    }
  });
}
