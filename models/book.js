const findOrCreate = require("mongoose-findorcreate");
const mongoose = require('mongoose');

let BookSchema = new mongoose.Schema(
    {
       name:{
        type: String,
        ref: 'user'
       },
       publishDate:{
        type: String
       },
       publisher:{
        type: String
       },
       type:{
        type: String
       },
       goal:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'readingGoal'
       }
    }, {timestamps: true}
);

// let BookSchema = new mongoose.Schema(
//     {
//         id: String,
//         name: String,
//         publishDate: String,
//         category: String,
//         publisher: String,
//         type: String
//     },
//     { timestamps: true }
// );
BookSchema.plugin(findOrCreate);
module.exports = mongoose.model('book', BookSchema);