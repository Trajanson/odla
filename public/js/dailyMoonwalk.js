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
const TIME_ELAPSED             = $('#moonwalk-time-elapsed');

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



    provideWarningAboutLeavingPageBeforeSubmittingMoonwalk();
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

function warningMessageText() {
  return (`Your moonwalk will not be stored until you click to confirm that you have memorized ${stockPersonFirstName}'s message.\n\nAre you sure that you want to leave?`);
};

function sendWarningMessage() {
  removeWarningAboutLeavingPage();
  return confirm(warningMessageText());
};

function provideWarningAboutLeavingPageBeforeSubmittingMoonwalk() {
  $("a").on("click", sendWarningMessage);
  $(window).bind('beforeunload', warningMessageText);
};

function removeWarningAboutLeavingPage() {
  $( "a" ).off("click", sendWarningMessage );
  $(window).unbind('beforeunload', warningMessageText);
}













function forceTwoDigits(value) {
  let string = String(value);
  if (string.length < 2) {
    return '0' + string;
  } else {
    return string;
  }
};


function formatElapsedTimeClock(elapsedSeconds) {
  let remainingMilisecondsToAccountFor = elapsedSeconds,
      days,
      hours,
      minutes,
      seconds,
      miliseconds;

      days = Math.floor(remainingMilisecondsToAccountFor / (60 * 60 * 24 * 1000));
      remainingMilisecondsToAccountFor -= (days * 60 * 60 * 24 * 1000);

      hours = Math.floor(remainingMilisecondsToAccountFor / (60 * 60 * 1000));
      remainingMilisecondsToAccountFor -= (hours * 60 * 60 * 1000);

      minutes = Math.floor(remainingMilisecondsToAccountFor / (60 * 1000));
      remainingMilisecondsToAccountFor -= (minutes * 60 * 1000);


      seconds = Math.floor(remainingMilisecondsToAccountFor/1000);
      remainingMilisecondsToAccountFor -= (seconds * 1000);

      miliseconds = Math.floor(remainingMilisecondsToAccountFor/100);

      return forceTwoDigits(days) + " : " +
             forceTwoDigits(hours) + " : " +
             forceTwoDigits(minutes) + " : " +
             forceTwoDigits(seconds) + " : " +
             forceTwoDigits(miliseconds);

};

function updateElapsedTime() {
  let newElapsedTimeSeconds = (Date.now() - draftMoonwalk.created_at),
      formattedTime         = formatElapsedTimeClock(newElapsedTimeSeconds);
  TIME_ELAPSED.text(formattedTime);
};



function setClockOnElapsedTime() {
  intervalID = window.setInterval(updateElapsedTime, 100);
};











function handleFlipButtonClick() {
  event.preventDefault();
  FLASHCARD.toggleClass('clicked');

  console.log(draftMoonwalk);

  draftMoonwalk.created_at = Date.now();
  $.ajax({
    type: "POST",
    url: "/api/moonwalk/create",
    data: draftMoonwalk,
    success (data) {
      console.log(data);
    }
  });

  removeWarningAboutLeavingPage();

  setClockOnElapsedTime();

};
