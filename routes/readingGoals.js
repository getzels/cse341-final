const express = require('express');
const router = express.Router();
const goalController =  require('../controller/readingGoals');
const passport = require("passport");
const isLoggedIn = require("./authentication").isLoggedIn;

router.use(passport.initialize());
router.use(passport.session());

//Get user's goals
router.get('/userGoals', goalController.getUserGoals)

//Create a goal
router.post('/:book', isLoggedIn, goalController.createGoal)

//Get all goals
router.get('/', isLoggedIn, goalController.getGoals)

//Get a goal
router.get('/:_id', isLoggedIn, goalController.getGoal)

//Update a single goal
router.put('/:_id', isLoggedIn, goalController.updateGoal)

//Delete one single goal
router.delete('/:_id', isLoggedIn, goalController.deleteGoal);

module.exports = router;