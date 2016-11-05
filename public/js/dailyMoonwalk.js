// SETTINGS //////////////////////////////////////
//////////////////////////////////////////////////

const TIME_BETWEEN_NUMBER_VISUALIZATIONS = 1500;

// DIV Elements
const FLASHCARD                = $('#flashcard');
const IMAGE_CONTAINER          = $('#image-container');
const STOCK_PERSON_IMAGE       = $('#stockPersonImage');

const FLASHCARD_CONTAINER      = $('.flashcard-container');

const REPLAY_AUDIO_BUTTON      = $('#repeat-audio-button');

const VISUALIZATION_REQUEST_BUTTON = $('#visualization-request-button');
const VISUALIZATION_CONTAINER = $('#visualization-container');
const VISUALIZATION_IMAGE      = $('#number-visualization-image');

const FLIP_BUTTON              = $('#flip-button');
const TIME_ELAPSED             = $('#moonwalk-time-elapsed');

//////////////////////////////////////////////////
//////////////////////////////////////////////////


let insertedText = `Sure. No problem ${username}. `;
let repeatedPersonStatementAudio = new Audio(`/api/audioGenerationAPI/?text=${insertedText}${draftMoonwalk.personStatement}&voice=${draftMoonwalk.voice}`);



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
    REPLAY_AUDIO_BUTTON.on('click', function() {


      repeatedPersonStatementAudio.play();

      personStatementAudio.pause();
    });

    VISUALIZATION_REQUEST_BUTTON.on('click', visualizeMoonwalk);




    provideWarningAboutLeavingPageBeforeSubmittingMoonwalk();
});









function visualizeMoonwalk() {
  let phoneNumberDigits = draftMoonwalk.phoneNumber.split(''),
      numberImages = userNumberRepresentations.slice();

      personStatementAudio.pause();
      repeatedPersonStatementAudio.pause();


  VISUALIZATION_CONTAINER.show();


  function showNextDigit(remainingDigits, numberImages) {
    if (remainingDigits.length === 0) {
      window.setTimeout(function() {
        VISUALIZATION_CONTAINER.hide();
      }, TIME_BETWEEN_NUMBER_VISUALIZATIONS)
      return;
    } else {
      let nextDigitAsText = remainingDigits.shift(),
          currentDigitAsNumber = parseInt(nextDigitAsText);

      let digitAudio = new Audio(`/api/audioGenerationAPI/?text=${nextDigitAsText}&voice=${draftMoonwalk.voice}`);

      digitAudio.play();

      VISUALIZATION_IMAGE.attr('src', numberImages[currentDigitAsNumber]);


      window.setTimeout(function() {
        showNextDigit(remainingDigits, numberImages);
      }, TIME_BETWEEN_NUMBER_VISUALIZATIONS);
    }
  };

  showNextDigit(phoneNumberDigits, numberImages);
};












function sizeDivElements() {
  sizeImageWithinContainer();
};






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
