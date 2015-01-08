$(document).on("ready", function() {
// - - - - - - -- -  -- - - - - - - -

// Create a new sequence.
function makeNewSequence() {
  function musicControls() {
    return "<div class='musicControl'>"+
            "<div active='true' class='button-play'></div>"+
            "</div>";
  }

  function sequenceContainer() {
    return "<div class='sequence'>"+
           "<textarea></textarea>"+
           musicControls()+
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
$("#button-playAll").click(playAllSequences);

$(document).on("click", ".button-play", function() {
  var $seqContainer = $(this).closest(".sequence");
  playSequence($seqContainer);
});

// Initial Page Setup
makeNewSequence();

// - - - - - - -- -  -- - - - - - - -
});
