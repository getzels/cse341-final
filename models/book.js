const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema(
    {
        id: String,
        name: String,
        publishDate: String,
        category: String,
        publisher: String,
        type: String
    },
    { timestamps: true }
);
module.exports = mongoose.model('book', BookSchema);