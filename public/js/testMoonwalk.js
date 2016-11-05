

// Flashcard Audio Image
const FLASHCARD_SOUND_IMAGE_HEIGHT_RATIO_TO_CONTAINER = 0.2;
const FLASHCARD_SOUND_IMAGE_WIDTH_RATIO_TO_CONTAINER  = 0.13;


// DIV Elements
const FLASHCARD                = $('#flashcard');
const IMAGE_CONTAINER          = $('#image-container');
const STOCK_PERSON_IMAGE       = $('#stockPersonImage');

const FLASHCARD_CONTAINER      = $('.flashcard-container');
const SOUND_IMAGE_IN_FLASHCARD = $('.flashcard-container .flashcard-audio-image');
const CHECK_ANSWER_BUTTON      = $('#check-answer-button');
const USER_MOONWALK_ANSWER      = $('#attempted-moonwalk-answer');

//////////////////////////////////////////////////
//////////////////////////////////////////////////

function flashWarning() {

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
  let input = USER_MOONWALK_ANSWER.val(),
      arrayOfDigits = getPhoneNumberDigits(input);

      if (arrayOfDigits.length < 10) {
        flashWarning("Your phone number does not contain enough digits.")
      } else if (arrayOfDigits.length > 10) {
        flashWarning("Your phone number contains too many digits.")
      } else {
        if (arrayOfDigits == moonwalk.phoneNumber.split('')) {
          console.log("CORRECT!");
        } else {
          console.log("NOPE!");
        }
      }
}
