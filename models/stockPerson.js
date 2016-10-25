var mongoose = require('mongoose');
var random = require('mongoose-random');


var stockPersonSchema = mongoose.Schema({
  firstName: {
    type: String
  },
  photoPath: {
    index: {unique: true, dropDups: true},
    type: String
  },
  gender: {
    type: String
  }
});
stockPersonSchema.plugin(random, { path: 'r' });

var StockPerson = module.exports = mongoose.model('StockPerson', stockPersonSchema);

module.exports.createStockPerson = function(newStockPerson, callback) {
  newStockPerson.save(callback);
};


module.exports.retrieveRandomStockPerson = function(callback) {
  StockPerson.findRandom().limit(1).exec(function(err, stockPersons) {
    callback(stockPersons[0]);
  });
};
