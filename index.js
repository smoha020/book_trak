const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

//mongoose 
mongoose.connect(process.env.URI || 'mongodb://localhost/book_trak', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .catch(err => console.log(err));

var db = mongoose.connection;
db.on('error', (err) => console.log(err));
db.once('open', () => console.log('we are connected'));

const app = express();

//body parser no longer needed 
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(cors())
app.use('/book', require('./routes/book'));
app.use('/author', require('./routes/author'));

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'front_end', 'build')));


  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'front_end', 'build', 'index.html'))
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log('running on Port ' + PORT)); 

