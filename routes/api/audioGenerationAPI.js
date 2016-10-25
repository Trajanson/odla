var Secrets          = require('./../../config/secrets.js');
var express          = require('express');
var router           = express.Router();
var url              = require('url');
var watson           = require('watson-developer-cloud');


router.get('/', ensureAuthenticated, function(req, res) {
  var query = url.parse(req.url, true).query;

  var text_to_speech = watson.text_to_speech({
    username: Secrets.BLUEMIX_USERNAME,
    password: Secrets.BLUEMIX_PASSWORD,
    version: 'v1',
    url: 'https://stream.watsonplatform.net/text-to-speech/api'
  });

  var params = {
    text: query.text,
    voice: query.voice,
    accept: 'audio/wav'
  };

  text_to_speech.synthesize(params).pipe(res);
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
