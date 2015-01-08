function getNoteArray() {
  var noteArray = [];
  for (var tone in toneToFrequencyMap) {
    noteArray.push(tone);
  }
  return noteArray;
}

function drawSequenceVisual(seqContainer) {
  var $seqContainer =  $(seqContainer);
  var $visual = $seqContainer.find(".soundTranslation");
  $visual.empty();

  var sequence = $seqContainer.data("soundSeq");
  var notes = getNoteArray();
  var bpm = $seqContainer.find(".bpm").val();

  var height = $visual.height();
  var width = $visual.width();
  var boxHeight = 2//height/notes.length;
  var boxWidth = 1000/bpm;

  for (var i=0; i<sequence.length; i++) {
    var note = sequence[i];
    var specialClasses = (note==="--") ? "rest" : "";

    var color = "black";
    var bottom = notes.indexOf(note)/notes.length*height;
    var left = i*boxWidth;
    var $box = $("<div class='visualBox "+specialClasses+"'></div>");
    $box.css({
      "height":boxHeight,
      "width":boxWidth,
      "background-color":color,
      "left":left,
      "bottom":bottom
    });
    $visual.append($box);
  }
}

function clearVisual(seqContainer) {
  $(seqContainer).find(".visualBox.active").removeClass("active");
}

function stepVisual(seqContainer) {
  var $visual = $(seqContainer).find(".soundTranslation");
  var $current = $visual.find(".visualBox.active");
  if ($current.length){
    $current.removeClass("active");
    var $next = $current.next(".visualBox");
    if ($next.length) {
      $next.addClass("active");
    }
  } else {
    $visual.find(".visualBox:first").addClass("active");
  }
}
