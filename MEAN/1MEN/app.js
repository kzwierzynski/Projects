const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const expressValidator = require('express-validator');


//connect to db
mongoose.connect('mongodb://localhost/MEN1');
let db = mongoose.connection;

//check connection
db.once('open', ()=>{
    console.log('Connected to MongoDB')
})

//check for DB errors
db.on('error', (err)=>{
    console.log(err);
});

//init app
const app = express();

//Bring in Models from Mongoose
let Article = require('./models/article');


//-------------MIDDLEWARE--------------------

//setup a static path
app.use(express.static(path.join(__dirname, 'public')));

//load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Middleware for Body parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
 // parse application/json
app.use(bodyParser.json());

//Middleware for express-validator
app.use(expressValidator());

//Middleware for express-session
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
    // cookie: { secure: true }
  }));

// Middleware for express-messages
// app.use(require('connect-flash')());
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});


// ------ROUTES-----------------------

//home route
app.get('/', function(req, res){
    Article.find({}, (err, articles)=>{
        if (err){
            console.log(err);
        } else {
            res.render('index', {
                title: 'Articles',
                articles : articles
            });
        }
    });
    
});

// ------ROUTE files-----------------------
let articles = require('./routes/articles');
app.use('/articles', articles);



//start server
app.listen(3000,()=>{
    console.log('Server started on port 3000... ')
});