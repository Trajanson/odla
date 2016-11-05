var mongoose = require('mongoose');
var StockPerson = require('./stockPerson.js');

var moonwalkSchema = mongoose.Schema({
  stockPerson: {type: mongoose.Schema.Types.ObjectId, ref: 'StockPerson'},
  imageURL: {type: String},
  stockPersonFirstName: {type: String},
  phoneNumber:     {type: String},
  personStatement: {type: String},
  user:        {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  voice: {type: String},
  created_at:  { type: Date },
  completed:   Boolean
});


var Moonwalk = module.exports = mongoose.model('Moonwalk', moonwalkSchema);

module.exports.createMoonwalk = function(newMoonwalk, callback) {
  newMoonwalk.save(callback);
};

module.exports.generateDraftMoonwalk = function(currentUser, callback) {

  StockPerson.retrieveRandomStockPerson(function(randomStockPerson) {
      let voice             = selectVoice(randomStockPerson.gender),
      randomPhoneNumber = generateRandomPhoneNumber(),
      statement         = generateStatement(randomPhoneNumber);

      let draftMoonwalk = new Moonwalk({
        stockPerson: randomStockPerson._id,
        stockPersonFirstName: randomStockPerson.firstName,
        imageURL: randomStockPerson.photoPath,
        phoneNumber: randomPhoneNumber,
        personStatement: statement,
        voice: voice,
        user: currentUser._id,
        created_at: Date.now(),
        completed: false
      });
      callback(draftMoonwalk, randomStockPerson.photoPath, randomStockPerson.firstName);
  });
};

function selectVoice(gender) {
  if (gender === 'M') {
    return 'en-US_MichaelVoice';
  } else {
    let randomNumber = Math.random();
    if (randomNumber < 0.65) {
      return 'en-US_LisaVoice';
    } else if (randomNumber < 0.85) {
      return 'en-GB_KateVoice'
    } else {
      return 'en-US_AllisonVoice'
    }
  };
};

function generateRandomPhoneNumber() {
  let phoneNumber = [];
  for (let i = 0; i <= 9; i += 1) {
    let randomDigit = Math.floor(Math.random() * 10);
    phoneNumber.push(randomDigit);
  };
  if (phoneNumber[0] === 0) {
    return generateRandomPhoneNumber();
  }
  return phoneNumber.join('');
}

function digitToWord(digit) {
  switch (Number(digit)) {
      case 0:
          return "zero";
          break;
      case 1:
          return "one";
          break;
      case 2:
          return "two";
          break;
      case 3:
          return "three";
          break;
      case 4:
          return "four";
          break;
      case 5:
          return "five";
          break;
      case 6:
          return "six";
          break;
      case 7:
          return "seven";
          break;
      case 8:
          return "eight";
          break;
      case 9:
          return "nine";
          break;
      default:
          return "";
          break;
  }
}

function stringifyPhoneNumber(phoneNumber) {
  return (digitToWord(phoneNumber[0]) + " " +
          digitToWord(phoneNumber[1]) + " " +
          digitToWord(phoneNumber[2]) + " " +
          digitToWord(phoneNumber[3]) + " " +
          digitToWord(phoneNumber[4]) + " " +
          digitToWord(phoneNumber[5]) + " " +
          digitToWord(phoneNumber[6]) + " " +
          digitToWord(phoneNumber[7]) + " " +
          digitToWord(phoneNumber[8]) + " " +
          digitToWord(phoneNumber[9]) );
};

function generateStatement(phoneNumber) {
  let stringifiedPhoneNumber = stringifyPhoneNumber(phoneNumber);
  return `My phone number is ${stringifiedPhoneNumber}`;
};
