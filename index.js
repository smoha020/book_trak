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




/*   BACKEND NOTES

--nodemon was not working properly because on the start and dev
scripts I wrote express.js instead of express. nothing was working 
because of this.

--concurrently was not working untill they could not run on the same 
port. Changed port on index.js(this file) to 5000.

--when creating a new exercise in the front end, you dont make an id 
propoerty in the new object becaue mongodb will do it.

--when updating, don't put id in the schema. This gave me problems.

--for the put request copy how its done on mongoose documentation

--app.use instead of app.get on index.js when requiring routes


*/