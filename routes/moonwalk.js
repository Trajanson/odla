var express = require('express');
var router  = express.Router();
var url     = require('url');


var Moonwalk = require('../models/moonwalk');
var StockPerson = require('../models/stockPerson');

// Get Homepage
router.get('/', ensureAuthenticated, function(req, res) {
  let current_user = req.user;

  Moonwalk.generateDraftMoonwalk(current_user, function(draftMoonwalk, stockPersonPhotoPath, stockPersonFirstName) {
    res.render('dailyMoonwalk', {draftMoonwalk: draftMoonwalk,
                                 stockPersonPhotoPath: stockPersonPhotoPath,
                                 stockPersonFirstName: stockPersonFirstName,
                                 userNumberRepresentations: JSON.stringify(current_user.numberRepresentations)
                               }
    );
  });


});

router.get('/test', ensureAuthenticated, function(req, res) {
  let query = url.parse(req.url, true).query,
      moonwalkID   = query.moonwalk,
      current_user = req.user,
      callback = function(error, moonwalk) {
        if (error || !moonwalk) {
          res.render('error', {});
        } else { 
          let callback = function(error, stockPerson) {
            if (error || !stockPerson) {
              res.render('error', {});
            } else { 
              res.render('testMoonwalk', {moonwalk: moonwalk,
                                          stockPersonPhotoPath: stockPerson.imageURL,
                                          stockPersonFirstName: stockPerson.firstName
                                        });
            }

          }
          StockPerson.findOne({ _id : moonwalk.stockPerson }, callback);
        }
      };

  Moonwalk.findOne({ _id : moonwalkID }, callback);



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
