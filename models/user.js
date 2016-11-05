var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');


var UserSchema = mongoose.Schema({
	username: {
		type:  String,
		index: true
	},
	password: {
		type:  String
	},
	email: {
		type:  String
	},
	name: {
		type:  String
	},
  numberRepresentations: [String]
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {

          newUser.numberRepresentations = getArrayOfCelebrityPhotos(10);

	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
};

module.exports.getUserByUsername = function(username, callback) {
  var query = { username: username};
  User.findOne(query, callback);
};

module.exports.getUserById = function(id, callback) {
  User.findById(id, callback);
};

module.exports.comparePassword = function(candidatePassword, hash, callback) {
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    if (err) throw err;
    callback(null, isMatch);
  });
};
















function getArrayOfCelebrityPhotos (numberOfCelebrities) {
  let clonedCelebrityPhotos = celebrityImages.slice(0);
    shuffledCelebrityPhotos = shuffle(clonedCelebrityPhotos),
    userRepresentations = [];
  while(userRepresentations.length < 10) {
    userRepresentations.push(shuffledCelebrityPhotos.pop())
  };
  return userRepresentations;
}



function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


let celebrityImages = [
  'https://s3.amazonaws.com/odla/celebrity+photos/amy-poehler.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/batman.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/bradley-cooper.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/britney_spears.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/carrie_bradshaw.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/goku.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/oprah-winfrey.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/super-mario.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/superman.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/taylor-swift.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/the-hulk.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/thor.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/tom-cruise.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/will_smith.jpg',
  'https://s3.amazonaws.com/odla/celebrity+photos/wonder-woman.jpeg'
];
