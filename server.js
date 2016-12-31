'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const app = express();
const knex = require('./knex');
const flash = require('connect-flash');


app.disable('x-powered-by');

const bodyParser = require('body-parser');
const session = require('express-session');
const bcrypt = require('bcrypt-as-promised');
const methodOverride = require('method-override');


const ejs = require('ejs');
// Middleware
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(session({
  name: 'crud',
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {}
}))
app.use(methodOverride('_method'));

//use as second argument whenever a user needs to be authenticated and logged in to view
const checkAuth = function(req, res, next) {
  if (!req.session.user) {
    return res.sendStatus(401);
  }
  next();
}

// Declare routes variables
const users = require('./routes/users.js');
const token = require('./routes/token.js');

// Assign Routes to Server
app.use(users);
app.use(token);


app.get('/', function(req, res) {
    res.render('index');
});
app.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('signupMessage') });
});
app.get('/login', function(req, res) {
  res.render('login.ejs', { message: req.flash('loginMessage') });
});

const port = process.env.PORT || 3000;
// Server Listener
app.listen(port, function() {
    console.log('listening on port: ' + port);
});

module.exports = app;




// SET SESSION SECRET
// bash -c 'echo "SESSION_SECRET="$(openssl rand -hex 64)' >> .env
