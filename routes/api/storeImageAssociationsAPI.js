var express          = require('express');
var router           = express.Router();
var url              = require('url');
var fs               = require('fs');
var multer           = require('multer');
var aws              = require('aws-sdk');
var multerS3         = require('multer-s3');

var secrets          = require('./../../config/secrets');

var User = require('./../../models/user.js');

aws.config.region          = 'us-east-1';
aws.config.accessKeyId     = secrets.S3AccessKeyId;
aws.config.secretAccessKey = secrets.S3SecretAccessKey;
aws.config.region          = secrets.S3Region;
var s3 = new aws.S3();



var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'odla',
    acl: 'public-read',
    key: function (req, file, cb) {
      let currentUser = req.user,
          username = currentUser.username;

      var query = url.parse(req.url, true).query;
      var params = {
        number: query.number,
      };

      let photoFileName = `userPhotos/${ Date.now().toString()}-${username}`;
      User.findById(currentUser.id, function(err, userDocument) {

        console.log("userDocument", userDocument);
        console.log("params.number", params.number);

        console.log("old url", userDocument.numberRepresentations[params.number]);

        if (err) throw err;
        userDocument.numberRepresentations.set(params.number, `https://s3.amazonaws.com/odla/${photoFileName}`);

        console.log("new user document", userDocument);

        userDocument.save(function(err) {
          if (err) throw err;
          console.log("THE DOCUMENT WAS SAVED!");
          req.newImageURL = `https://s3.amazonaws.com/odla/${photoFileName}`;
          cb(null, fileName = photoFileName);
        });
      });

    }
  })
})

router.post('/', ensureAuthenticated, upload.single('uploadedPicture'), function(req, res) {
  res.send(req.newImageURL);
  // res.send("Uploaded!");


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
