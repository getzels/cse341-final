const mongoose = require('mongoose');

let DirectorySchema = new mongoose.Schema(
    {
       user:{
        type: String,
        ref: 'user'
       },
       note:{
        type: String
       },
       books: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
       }],
    }, {timestamps: true}
);

// let DirectorySchema = new mongoose.Schema(
//     {
//         id: String,
//         book: Book,
//         user: User,
//         note: String
//     },
//     { timestamps: true }
// );
module.exports = mongoose.model('directory', DirectorySchema);