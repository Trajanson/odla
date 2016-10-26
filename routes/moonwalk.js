var express = require('express');
var router  = express.Router();

var Moonwalk = require('../models/moonwalk');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res) {
  let current_user = req.user;

  Moonwalk.generateDraftMoonwalk(current_user, function(draftMoonwalk, stockPersonPhotoPath, stockPersonFirstName) {
    res.render('dailyMoonwalk', {draftMoonwalk: draftMoonwalk,
                                 stockPersonPhotoPath: stockPersonPhotoPath,
                                 stockPersonFirstName: stockPersonFirstName}
    );
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

module.exports = router;
