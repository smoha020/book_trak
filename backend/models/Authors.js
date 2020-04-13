const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorsSchema = new Schema({
    author: {type: String}
})

const Authors = mongoose.model('Author', AuthorsSchema);

module.exports = Authors