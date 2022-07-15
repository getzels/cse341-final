const mongoose = require('mongoose');
const directory = require('./directory');

let ReadingGoalsSchema = new mongoose.Schema(
    {
       user:{
        type: String,
        ref: 'user'
       },
       description:{
        type: String,
       },
       startDate:{
        type: String
       },
       endDate:{
        type:String
       },
       completed:{
        type:Boolean,
        default:false
       },
       book:{
        id: mongoose.Schema.Types.ObjectId,
        ref:'book'
       }
    }, {timestamps: true}
);

// let ReadingGoalsSchema = new mongoose.Schema(
//     {
//         id: String,
//         directory: directory,
//         description: String,
//         startDate: Date, 
//         endDate: Date, 
//         completed: Boolean
//     },
//     { timestamps: true }
// );
module.exports = mongoose.model('readingGoal', ReadingGoalsSchema);