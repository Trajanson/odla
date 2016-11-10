var express          = require('express');
var router           = express.Router();
var url              = require('url');

var Moonwalk = require('./../../models/moonwalk');
var User = require('./../../models/user');

var Settings = require('./../../config/settings');

module.exports = router;

router.post('/create', ensureAuthenticated, function(req, res) {
  let newMoonwalk = new Moonwalk(req.body),
      callback    = function(err, moonwalk) {
          if (err) throw err;
  };

  Moonwalk.createMoonwalk(newMoonwalk, callback);
});



router.post('/submitCompletedMoonwalk', ensureAuthenticated, function(req, res) {

  var query = url.parse(req.url, true).query;
  var params = {
    moonwalkId: query.moonwalkId,
    isCorrect:  query.isCorrect
  };

  let currentUser = req.user;

  Moonwalk.findById(params.moonwalkId, function(err, moonwalkDocument) {

    moonwalkDocument.completed = true;

    moonwalkDocument.save(function(err) {

      User.findById(currentUser.id, function(err, userDocument) {

        console.log(userDocument);

        console.log("Settings.maxPointsForWinningMoonwalk", Settings.maxPointsForWinningMoonwalk);

        if(params.isCorrect) {
          userDocument.score += Settings.maxPointsForWinningMoonwalk;
        }

        userDocument.save(function(err) {
          res.sendStatus(200);
        });
      });

    });
  });



});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
};
