// SETTINGS //////////////////////////////////////
//////////////////////////////////////////////////

// Flashcard Audio Image
const FLASHCARD_SOUND_IMAGE_HEIGHT_RATIO_TO_CONTAINER = 0.2;
const FLASHCARD_SOUND_IMAGE_WIDTH_RATIO_TO_CONTAINER  = 0.13;


// DIV Elements
const FLASHCARD                = $('#flashcard');
const IMAGE_CONTAINER          = $('#image-container');
const STOCK_PERSON_IMAGE       = $('#stockPersonImage');

const FLASHCARD_CONTAINER      = $('.flashcard-container');
const SOUND_IMAGE_IN_FLASHCARD = $('.flashcard-container .flashcard-audio-image');
const FLIP_BUTTON              = $('#flip-button');

//////////////////////////////////////////////////
//////////////////////////////////////////////////





$( document ).ready(function() {


    STOCK_PERSON_IMAGE.attr({
      'src': stockPersonPhotoPath
    });
    STOCK_PERSON_IMAGE.on('load', function() {
      sizeDivElements();
    });


    sizeDivElements();

    $( window ).resize(function() {
      sizeDivElements();
    });


    FLIP_BUTTON.on('click', handleFlipButtonClick);
    SOUND_IMAGE_IN_FLASHCARD.on('click', function() {
      personStatementAudio.play();
    });

});

function sizeDivElements() {
  sizeImageWithinContainer();
  fitSoundImageInFlashcard();
};


function fitSoundImageInFlashcard () {
  var containerHeight  = FLASHCARD_CONTAINER.height(),
      containerWidth   = FLASHCARD_CONTAINER.width();

  var soundImageHeight = containerHeight * FLASHCARD_SOUND_IMAGE_HEIGHT_RATIO_TO_CONTAINER,
      soundImageWidth = containerWidth * FLASHCARD_SOUND_IMAGE_WIDTH_RATIO_TO_CONTAINER;

  SOUND_IMAGE_IN_FLASHCARD.css({
    'min-height': soundImageHeight,
    'max-height': soundImageHeight,
    'min-width': soundImageWidth,
    'max-width': soundImageWidth,

  });
}




function sizeImageWithinContainer(){
  let image            = $(STOCK_PERSON_IMAGE),
      container        = $(IMAGE_CONTAINER),
      containerHeight  = container.height(),
      containerWidth   = container.width(),
      imageStartHeight = image.height(),
      imageStartWidth  = image.width(),
      isTooTallNotTooFat,
      shrinkMultiplier,
      imagePixelsFromLeft,
      imagePixelsFromTop,
      imageEndWidth,
      imageEndHeight;

      (containerHeight / imageStartHeight) < (containerWidth / imageStartWidth) ? isTooTallNotTooFat = true : isTooTallNotTooFat = false;

      if (isTooTallNotTooFat) {
        shrinkMultiplier = containerHeight / imageStartHeight;
        imageEndWidth = shrinkMultiplier * imageStartWidth;
        imageEndHeight = shrinkMultiplier * imageStartHeight;

        console.log("containerWidth: ", containerWidth);
        console.log("imageEndWidth: ", imageEndWidth);


        imagePixelsFromLeft = (containerWidth - imageEndWidth) / 2;
        console.log("imagePixelsFromLeft: ", imagePixelsFromLeft);
        console.log(containerWidth - imageEndWidth - imagePixelsFromLeft - imagePixelsFromLeft);
        imagePixelsFromTop = 0;
      } else {
        shrinkMultiplier = containerWidth / imageStartWidth;
        imageEndWidth = shrinkMultiplier * imageStartWidth;
        imageEndHeight = shrinkMultiplier * imageStartHeight;
        imagePixelsFromLeft = 0;
        imagePixelsFromTop = (containerHeight - imageEndHeight) / 2;
      }

      image.width(imageEndWidth);
      image.height(imageEndHeight);

      image.css({
        position: 'relative',
        left: imagePixelsFromLeft + 'px',
        top: imagePixelsFromTop + 'px',
      });

};


















function handleFlipButtonClick() {
  event.preventDefault();
  FLASHCARD.toggleClass('clicked');

  console.log(draftMoonwalk);

  $.ajax({
    type: "POST",
    url: "/api/moonwalk/create",
    data: draftMoonwalk,
    success (data) {
      console.log(data);
    }
  });

};
