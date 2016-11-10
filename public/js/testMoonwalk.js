// Flashcard Audio Image
const FLASHCARD_SOUND_IMAGE_HEIGHT_RATIO_TO_CONTAINER = 0.2;
const FLASHCARD_SOUND_IMAGE_WIDTH_RATIO_TO_CONTAINER  = 0.13;


// DIV Elements
const FLASHCARD                = ('#flashcard');
const IMAGE_CONTAINER          = ('#image-container');
const STOCK_PERSON_IMAGE       = ('#stock-person-image');

const FLASHCARD_CONTAINER      = ('.flashcard-container');
const SOUND_IMAGE_IN_FLASHCARD = ('.flashcard-container .flashcard-audio-image');
const CHECK_ANSWER_BUTTON      = ('#check-answer-button');
const USER_MOONWALK_ANSWER     = ('#attempted-moonwalk-answer');

const SUMBIT_PHONE_NUMBER_FORM = ('#check-phone-number-form');

const ANSWER_RESPONSE_TEXT = ('#answer-response-text');

//////////////////////////////////////////////////
//////////////////////////////////////////////////




function flashWarning() {
};

function submitCompletedMoonwalk(isCorrect) {
  console.log("moonwalk.moonwalkId", moonwalk.moonwalkId);
  console.log("isCorrect", isCorrect);

  $.ajax({
    type: "POST",
    url: `/api/moonwalk/submitCompletedMoonwalk?moonwalkId=${moonwalk.moonwalkId}&isCorrect=${isCorrect}`,
    success (data) {
      console.log(data);
    }
  });
};

function displayCorrectMessage() {
  submitCompletedMoonwalk(true);
  $(ANSWER_RESPONSE_TEXT).text("GREAT!")

};

function displayIncorrectResponseMessage() {
  submitCompletedMoonwalk(false);
  $(ANSWER_RESPONSE_TEXT).text("WRONG!");
};

function getPhoneNumberDigits(text) {
  let matches = text.match(/\d/g);
  if (matches) {
    return matches;
  } else {
    return [];
  }
};

function checkPhoneNumber() {
  let input = $(USER_MOONWALK_ANSWER).val(),
      arrayOfDigits = getPhoneNumberDigits(input);

      console.log('input', input);
      console.log('arrayOfDigits', arrayOfDigits);

      if (arrayOfDigits.length < 10) {
        flashWarning("Your phone number does not contain enough digits.")
      } else if (arrayOfDigits.length > 10) {
        flashWarning("Your phone number contains too many digits.")
      } else {
        if (arrayOfDigits.equals(moonwalk.phoneNumber.split('')) ) {
          console.log("CORRECT!");
          displayCorrectMessage();
        } else {
          console.log("FAIL!");
          displayIncorrectResponseMessage();
        }
      }
}



$(document).ready(function() {
  $(SUMBIT_PHONE_NUMBER_FORM).on('submit' , function(event) {

    event.preventDefault();

    $(FLASHCARD_CONTAINER).addClass("clicked")

    checkPhoneNumber();

  });
})








Array.prototype.equals = function( array ) {
  return this.length == array.length &&
         this.every( function(this_i,i) { return this_i == array[i] } )
  }
