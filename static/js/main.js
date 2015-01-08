$(document).on("ready", function() {
// - - - - - - -- -  -- - - - - - - -

// Create a new sequence.
function makeNewSequence() {
  function musicControls() {
    return "<div class='musicControl'>"+
            "<div class='button-loop inactive'>&#8734;</div>"+
            "<div class='button-play'></div>"+
            "</div>";
  }

  function sequenceContainer() {
    return "<div class='sequence'>"+
           "<textarea></textarea>"+
           "<input class='bpm' title='BPM' value='120' type='number'/>"+
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

$(document).on("click", ".button-loop", function() {
  $(this).toggleClass("active");
  $(this).toggleClass("inactive");
});

$(document).on("click", ".button-play", function() {
  var $seqContainer = $(this).closest(".sequence");
  playSequence($seqContainer);
});

$(document).on("change", ".bpm", function() {
  var val = $(this).val();
  if (val>260) $(this).val(260);
  if (val<1) $(this).val(1);
});

// Initial Page Setup
makeNewSequence();

// - - - - - - -- -  -- - - - - - - -
});
