var express          = require('express');
var path             = require('path');
var cookieParser     = require('cookie-parser');
var bodyParser       = require('body-parser');
var exphbs           = require('express-handlebars');
var expressValidator = require('express-validator');
var flash            = require('connect-flash');
var session          = require('express-session');
var passport         = require('passport');
var LocalStrategy    = require('passport-local').Strategy;

var DatabaseConfiguration = require('./config/database_configuration');
var mongo            = require('mongodb');
var mongoose         = require('mongoose');

mongoose.connect(DatabaseConfiguration.PATH);
var db = mongoose.connection;

var Moonwalk = require('./models/moonwalk');


var dashboard          = require('./routes/dashboard');
var users              = require('./routes/users');
var moonwalk           = require('./routes/moonwalk');
var imageRepresentations = require('./routes/settings/imageRepresentations');
var audioGenerationAPI = require('./routes/api/audioGenerationAPI');
var moonwalkAPI        = require('./routes/api/moonwalkAPI');
var storeImageAssociationsAPI = require('./routes/api/storeImageAssociationsAPI');

// Init App
var app = express();

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars',
           exphbs({defaultLayout: 'layout'}));
app.set('view engine', 'handlebars');


// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

// Initialize Passport
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
    var namespace = param.split('.')
      , root      = namespace.shift()
      , formParam = root;

      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param: formParam,
        msg:   msg,
        value: value
      };
  }
}));

// Connect Flash
app.use(flash());

// Global Variables
app.use(function(req, res, next) {
  let successfulFetchMoonwalksInProgressCallback = function (err, moonwalksInProgress) {
    res.locals.moonwalksInProgress = moonwalksInProgress;
    next();
  }

  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg   = req.flash('error_msg');
  res.locals.error       = req.flash('error');
  res.locals.user        = req.user || null;
  if (req.user) {
    Moonwalk.find({ user: req.user._id, completed: false },
                  successfulFetchMoonwalksInProgressCallback);
  } else {
    next();
  }
});
















app.use('/', dashboard);
app.use('/users', users);
app.use('/moonwalk', moonwalk);
app.use('/api/audioGenerationAPI', audioGenerationAPI);
app.use('/api/moonwalk', moonwalkAPI);
app.use('/api/storeImageAssociations', storeImageAssociationsAPI);
app.use('/settings/imageRepresentations', imageRepresentations);

// Set Port
app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function() {
  console.log('Server started on port ' + app.get('port'));
});


















//
