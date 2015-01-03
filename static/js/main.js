$(document).on("ready", function() {
// - - - - - - -- -  -- - - - - - - -

// Create a new sequence.
function makeNewSequence() {
  function musicControls() {
    return "<div class='musicControl'>"+
            "<div active='true' class='button-play'>Play</div>"+
            "</div>";
  }

  function sequenceContainer() {
    return "<div class='sequence'>"+
           musicControls()+
           "<textarea></textarea>"+
           "<div class='soundTranslation'></div>"+
           "</div>";
  }

  // Create the new sequence container and bind any events.
  var newSeq = $(sequenceContainer());
  newSeq.change(function() {
    translateSequence(this);
  });

  $("#sequenceContainer").append(newSeq);
}
$("#button-newSequence").click(makeNewSequence);
$(document).on("click", ".button-play", function() {
  var $seqContainer = $(this).closest(".sequence");
  var duration = $seqContainer.data("duration");
  if (duration===undefined) duration = 1000;

  var soundSeq = $seqContainer.data("soundSeq");
  playTones(soundSeq, duration);
});

// Initial Page Setup
makeNewSequence();

// - - - - - - -- -  -- - - - - - - -
});
