const mongoose = require('mongoose');
const directory = require('./directory');

let ReadingGoalsSchema = new mongoose.Schema(
    {
        id: String,
        directory: directory,
        description: String,
        startDate: Date, 
        endDate: Date, 
        completed: Boolean
    },
    { timestamps: true }
);
module.exports = mongoose.model('readingGoals', ReadingGoalsSchema);