function nucleotidesToAA(codonSeq) {
  var AASequence = [];
  for (var i=0; i<codonSeq.length; i++) {
    var codon = codonSeq[i];
    var AA = codonToAAMap[codon];
    if (AA===undefined) throw "Unknown codon `"+codon+"` in `codonSeq`!";
    AASequence.push(AA);
  }
  return AASequence;
}

function AAToSounds(AASequence) {
  var soundSequence = [];
  for (var i=0; i<AASequence.length; i++) {
    var sound = AAToSoundMap[AASequence[i]];
    soundSequence.push(sound);
  }
  return soundSequence;
}

function translateSequence(sequenceContainer) {
  function getCleanCodonSequence(rawSeq) {
    var codonSeq = [];
    var seq = rawSeq.toLowerCase().replace(/[,\s]/g,"");

    //Throw errors if the sequence is invalid.
    if (seq.length%3 > 0) throw "Invalid length: codons must be nucleotide triplets.";

    while (seq.length>2) {
      codon = seq.slice(0,3);
      seq = seq.slice(3);
      codonSeq.push(codon);
    }
    return codonSeq;
  }

  try {
    var $sequenceContainer = $(sequenceContainer);
    var rawCodonSeq = $sequenceContainer.find("textarea").val();
    var codonSeq = getCleanCodonSequence(rawCodonSeq);
    var AASeq = nucleotidesToAA(codonSeq);
    var soundSeq = AAToSounds(AASeq);
    $sequenceContainer.data("soundSeq", soundSeq);
    $sequenceContainer.find(".soundTranslation").html(soundSeq.join(", "));
    $sequenceContainer.removeClass("error");

  } catch (err) {
    if ((typeof console) !== "undefined") console.log(err);
    $sequenceContainer.addClass("error");

  }
}

function translateSequences() {
  $(".sequence").each(function() {
    translateSequence(this);
  });
}
