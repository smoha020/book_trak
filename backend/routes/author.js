const express = require('express');
const Authors = require('../models/Authors');


const router = express.Router();

router.get('/', (req, res) => {

    Authors.find()
        .then(data => res.json(data))
        .catch(err => console.log(err))
})


router.post('/', (req, res) => {
    
    const newAuthor = new Authors({
        author: req.body.author
    })
    newAuthor.save()
        .then(() => res.json(newAuthor))
        .catch(err => console.log(err))
})

module.exports  = router;