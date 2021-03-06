// Imports
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

// Require Secrets File
const secrets = require("./secrets")

// Require routes
var index = require('./routes/index');
const api = require('./routes/api/index');

// Setup an express app
var app = express();


// **************************

// Database connection here

//Import the mongoose module
var mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = secrets.DATABASE_URL;
mongoose.connect(mongoDB, {
  useMongoClient: true
});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// ********************



// **************************

// CORS config will be here
app.all('/*', function(req, res, next) {
  // CORS headers
  res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  // Set custom headers for CORS
  res.header('Access-Control-Allow-Headers', 'Content-type,Accept,X-Access-Token,X-Key');
  if (req.method == 'OPTIONS') {
    res.status(200).end();
  } else {
    next();
  }
});

// ********************



// **************************

// Authentication setup here


const passport = require("passport");
const JwtStrategy =  require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const Models = require('./models/index');
const User = Models.User;

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secrets.PASSPORT_JWT_SECRET;


passport.use(new JwtStrategy(opts,
  (jwt_payload, done) => {
  User.findOne({id: jwt_payload.sub}, function(err, user) {
    if (err) {
        return done(err, false, { message: 'Invalid Token.' } );
    }
    if (user) {
        return done(null, user);
    } else {
        return done(null, false);
        // or you could create a new account
    }
  });
}));

// ********************

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Configure middlewares
app.use(logger('dev'));

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
// for easier testing with Postman or plain HTML forms
app.use(bodyParser.urlencoded({ extended: false }));

// Initialize passport
app.use(passport.initialize());

app.use('/', index);
app.use('/api/v1', api)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
