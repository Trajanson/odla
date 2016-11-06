var DatabaseConfiguration = require('./../config/database_configuration');
var mongo            = require('mongodb');
var mongoose         = require('mongoose');
mongoose.connect(DatabaseConfiguration.PATH);
var db = mongoose.connection;
var StockPerson = require('./../models/stockPerson');
var User        = require('./../models/user');



let guestUser = new User({
  username: 'Guest User',
  password: "f8acd5eec2c7ae55399954ac5d",
  email: 'guest@guest.com',
  name: 'Guest User',
});

User.createUser(guestUser, function(err, guestUser) {
  if (err) throw err;
  console.log(guestUser);
  createMaleStockPeople();
});






const MaleStockPhotoURLs = [
  'https://s3.amazonaws.com/odla/stock+photos/male/male_1.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_2.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_3.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_4.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_5.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_6.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_7.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_8.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_9.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_10.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_11.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_12.png',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_13.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_14.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_15.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_16.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_17.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_18.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_19.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_20.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_21.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_22.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_23.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_24.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_25.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_26.jpeg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_27.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_28.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_29.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/male/male_30.jpg'
]


const FemaleStockPhotoURLs = [
  'https://s3.amazonaws.com/odla/stock+photos/female/female_1.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_2.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_3.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_4.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_5.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_6.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_7.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_8.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_9.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_10.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_11.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_12.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_13.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_14.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_15.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_16.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_17.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_18.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_19.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_20.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_21.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_22.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_23.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_24.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_25.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_26.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_27.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_28.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_29.jpg',
  'https://s3.amazonaws.com/odla/stock+photos/female/female_30.jpg'
]


const MaleFirstNames = [
  'James',
  'John',
  'Robert',
  'Michael',
  'William',
  'David',
  'Richard',
  'Charles',
  'Joseph',
  'Thomas',
  'Christopher',
  'Daniel',
  'Paul',
  'Mark',
  'Donald',
  'George',
  'Kenneth',
  'Steven',
  'Edward',
  'Brian',
  'Ronald',
  'Anthony',
  'Kevin',
  'Jason',
  'Matthew',
  'Gary',
  'Timothy',
  'Jose',
  'Larry',
  'Jeffrey',
  'Frank',
  'Scott',
  'Eric',
  'Stephen',
  'Andrew',
  'Raymond',
  'Gregory',
  'Joshua',
  'Jerry',
  'Dennis',
  'Walter',
  'Patrick',
  'Peter',
  'Harold',
  'Douglas',
  'Henry',
  'Carl',
  'Arthur',
  'Ryan',
  'Roger',
  'Joe',
  'Juan',
  'Jack',
  'Albert',
  'Jonathan',
  'Justin',
  'Terry',
  'Gerald',
  'Keith',
  'Samuel',
  'Willie',
  'Ralph',
  'Lawrence',
  'Nicholas',
  'Roy',
  'Benjamin',
  'Bruce',
  'Brandon',
  'Adam',
  'Harry',
  'Fred',
  'Wayne',
  'Billy',
  'Steve',
  'Louis',
  'Jeremy',
  'Aaron',
  'Randy',
  'Howard',
  'Eugene',
  'Carlos',
  'Russell',
  'Bobby',
  'Victor',
  'Martin',
  'Ernest',
  'Phillip',
  'Todd',
  'Jesse',
  'Craig',
  'Alan',
  'Shawn',
  'Clarence',
  'Sean',
  'Philip',
  'Chris',
  'Johnny',
  'Earl',
  'Jimmy',
  'Antonio'
]

const FemaleFirstNames = [
  'Mary',
  'Patricia',
  'Linda',
  'Barbara',
  'Elizabeth',
  'Jennifer',
  'Maria',
  'Susan',
  'Margaret',
  'Dorothy',
  'Lisa',
  'Nancy',
  'Karen',
  'Betty',
  'Helen',
  'Sandra',
  'Donna',
  'Carol',
  'Ruth',
  'Sharon',
  'Michelle',
  'Laura',
  'Sarah',
  'Kimberly',
  'Deborah',
  'Jessica',
  'Shirley',
  'Cynthia',
  'Angela',
  'Melissa',
  'Brenda',
  'Amy',
  'Anna',
  'Rebecca',
  'Virginia',
  'Kathleen',
  'Pamela',
  'Martha',
  'Debra',
  'Amanda',
  'Stephanie',
  'Carolyn',
  'Christine',
  'Marie',
  'Janet',
  'Catherine',
  'Frances',
  'Ann',
  'Joyce',
  'Diane',
  'Alice',
  'Julie',
  'Heather',
  'Teresa',
  'Doris',
  'Gloria',
  'Evelyn',
  'Jean',
  'Cheryl',
  'Mildred',
  'Katherine',
  'Joan',
  'Ashley',
  'Judith',
  'Rose',
  'Janice',
  'Kelly',
  'Nicole',
  'Judy',
  'Christina',
  'Kathy',
  'Theresa',
  'Beverly',
  'Denise',
  'Tammy',
  'Irene',
  'Jane',
  'Lori',
  'Rachel',
  'Marilyn',
  'Andrea',
  'Kathryn',
  'Louise',
  'Sara',
  'Anne',
  'Jacqueline',
  'Wanda',
  'Bonnie',
  'Julia',
  'Ruby',
  'Lois',
  'Tina',
  'Phyllis',
  'Norma',
  'Paula',
  'Diana',
  'Annie',
  'Lillian',
  'Emily',
  'Robin'
]


function selectRandomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};



































function createMaleStockPeople() {
  let creationCount = 0,
      numberOfMales = MaleStockPhotoURLs.length;

  MaleStockPhotoURLs.forEach(function(photo_url, index) {
    let newStockPerson = new StockPerson({
      firstName: selectRandomFrom(MaleFirstNames),
      photoPath: photo_url,
      gender: 'M',
    });

    StockPerson.createStockPerson(newStockPerson,function(err, stockPerson) {
      if (err) throw err;
      console.log(stockPerson);

      creationCount += 1;
      if (creationCount === numberOfMales) {
        createFemaleStockPeople();
      }
    });
  });
}



function createMaleStockPeople() {
  let creationCount = 0,
      numberOfFemales = FemaleStockPhotoURLs.length;


  FemaleStockPhotoURLs.forEach(function(photo_url, index) {
    let newStockPerson = new StockPerson({
      firstName: selectRandomFrom(FemaleFirstNames),
      photoPath: photo_url,
      gender: 'F',
    });

    StockPerson.createStockPerson(newStockPerson,function(err, stockPerson) {
      if (err) throw err;
      console.log(stockPerson);
      creationCount += 1;
      if (creationCount === numberOfFemales) {
        endConnection();
      }

    });
  });
};







function endConnection() {
  db.close(function(){
    process.on('exit', function (){
      console.log('Seeding successful.');
    });
  })
};




//
