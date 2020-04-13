const express = require('express');
const Books = require('../models/Books');

const router = express.Router();

//READ
router.get('/', (req, res) => {

    Books.find()
        .then(data => res.json(data))
        .catch(err => console.log(err));
})

//CREATE
router.post('/', (req, res) => {

    const newBook = new Books({
        _id: req.body._id,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        date: req.body.date
    })
    
    newBook.save()
        .then(() => res.json(newBook))
        .catch((err) => console.log(err))
})


//UPDATE 
router.put('/:_id', (req,res) => {
    
    const filter = {_id: req.params._id};
    

    //console.log(update);
    /*if you want to use update ={_id = req..,...}, you dont' need the 
    $inside updateOne*/
    Books.updateOne(filter, { $set : {
        _id: req.params._id,
        title: req.body.title,
        author: req.body.author,
        genre: req.body.genre,
        date: req.body.date
    } })
        //res below is an object with data, header, ..etc
        .then(() => res.json('success'))
        .catch(err => console.log(err));
})


//DELETE 
router.delete('/:_id', (req, res) => { 

    const filter = {_id: req.params._id};
    Books.deleteOne(filter)
        .then(() => res.json('deleted'))
        .catch((err) => console.log(err));
})

module.exports = router; 
