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
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
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

//add route
app.get('/articles/add', function(req, res){
    res.render('addArticle', {
        title: 'Add an Article'
    });
});

//route to given articles
app.get('/article/:id', (req, res)=>{
    Article.findById(req.params.id, (err, article)=> {
        if (err) {
            console.log(err);
        } else {
            res.render('anArticle', {
                article:article});
        }
    });
});

//route to edit article
app.get('/article/edit/:id', function(req, res){
    Article.findById(req.params.id, (err, article)=> {
        if (err) {
            console.log(err);
        } else {
            res.render('editArticle', {
                article : article});
        }
        
    });
});

//add article route
app.post('/articles/add', function(req, res){
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            req.flash('success', 'Article Added')
            res.redirect('/');
        }
    })
});

//edit article route
app.post('/articles/edit/:id', function(req, res){
    let query = {_id: req.params.id};
    let editArticle = {};
    editArticle.title = req.body.title;
    editArticle.author = req.body.author;
    editArticle.body = req.body.body;

    Article.update(query, editArticle, (err)=>{
        if(err){
            console.log(err);
            return;
        }else{
            res.redirect('/');
        }
    });
});

//delete
app.delete('/article/:id', (req, res)=>{
    let query = {_id: req.params.id};
    Article.findById(req.params.id).remove((err)=>{
        if (err){
            console.log(err);
            // return;
        }else{
            res.send('success');    //must be, because called from the Client side (main.js)
        }
    })
});

//start server
app.listen(3000,()=>{
    console.log('Server started on port 3000... ')
});