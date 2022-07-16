const findOrCreate = require("mongoose-findorcreate");
const mongoose = require('mongoose');


let ReadingGoalsSchema = new mongoose.Schema(
    {
        user:{
            type: String
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
            type: mongoose.Schema.Types.ObjectId,
            ref:'book'
        }
    }, {timestamps: true}
);

ReadingGoalsSchema.plugin(findOrCreate);
module.exports = mongoose.model('readingGoal', ReadingGoalsSchema);