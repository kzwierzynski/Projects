const express = require('express');
const router = express.Router();

//Bring in Models from Mongoose
let Article = require('../models/article');

//add route
router.get('/add', function(req, res){
    res.render('addArticle', {
        title: 'Add an Article'
    });
});

//route to given articles
router.get('/:id', (req, res)=>{
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
router.get('/edit/:id', function(req, res){
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
router.post('/add', function(req, res){

    req.checkBody('title', 'You need to add a title to the article').notEmpty();
    req.checkBody('author', 'You need to add an author to the article').notEmpty();
    req.checkBody('body', 'You need to add some content to the article').notEmpty();

    let errors = req.validationErrors();

    if (errors) {
        res.render('addArticle', {
            title: 'Add an Article',
            errors: errors
        });
    } else {
        let article = new Article();
        article.title = req.body.title;
        article.author = req.body.author;
        article.body = req.body.body;
    
        article.save((err)=>{
            if(err){
                console.log(err);
                return;
            }else{
                req.flash('success', 'Article Added');
                res.redirect('/');
            }
        });
    }   
});

//edit article route
router.post('/edit/:id', function(req, res){
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
            req.flash('success', 'Article Updated');
            res.redirect('/');
        }
    });
});

//delete
router.delete('/:id', (req, res)=>{
    let query = {_id: req.params.id};
    Article.findById(req.params.id).remove((err)=>{
        if (err){
            console.log(err);
            // return;
        }else{
            req.flash('success', 'Article Deleted');
            res.send('success');    //must be, because called from the Client side (main.js)
        }
    })
});

module.exports = router;