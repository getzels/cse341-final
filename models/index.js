const dbConfig = require('../config/db.config');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.book = require('./book');
db.user = require('./user');
db.directory = require('./directory');
db.readingGoal = require('./readingGoals');


module.exports = db;

