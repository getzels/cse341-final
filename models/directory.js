const mongoose = require('mongoose');
const Book = require('./book');
const User = require('./user');

let DirectorySchema = new mongoose.Schema(
    {
        id: String,
        book: Book,
        user: User,
        note: String
    },
    { timestamps: true }
);
module.exports = mongoose.model('directory', DirectorySchema);