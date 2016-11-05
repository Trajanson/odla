var express          = require('express');
var router           = express.Router();

var Moonwalk = require('./../../models/moonwalk');

module.exports = router;

router.post('/create', ensureAuthenticated, function(req, res) {
  let newMoonwalk = new Moonwalk(req.body),
      callback    = function(err, moonwalk) {
          if (err) throw err;
  };

  Moonwalk.createMoonwalk(newMoonwalk, callback);
});



function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
};
