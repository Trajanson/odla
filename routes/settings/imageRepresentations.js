var express = require('express');
var router  = express.Router();
var url     = require('url');


router.get('/', ensureAuthenticated, function(req, res) {
  let current_user = req.user;
  let userNumberRepresentations = current_user.numberRepresentations;

  res.render('imageRepresentationSettings', {
    userNumberRepresentations: (userNumberRepresentations)
    // userNumberRepresentations: JSON.stringify(userNumberRepresentations)
  });
});

module.exports = router;


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }
};
