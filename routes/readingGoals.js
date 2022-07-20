const express = require('express');
const router = express.Router();
const goalController =  require('../controller/readingGoals');
const passport = require("passport");
const isLoggedIn = require("./authentication").isLoggedIn;
const {readingGoalValidation} = require('../validation');
const {body, validationResult } = require('express-validator');
router.use(passport.initialize());
router.use(passport.session());

//Get user's goals
router.get('/userGoals', goalController.getUserGoals)

//Create a goal
router.post('/:book', isLoggedIn, readingGoalValidation,
(req, res, next) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array()});
}else{
    next()
}}, goalController.createGoal)

//Get all goals
router.get('/', isLoggedIn, goalController.getGoals)

//Get a goal
router.get('/:_id', isLoggedIn, goalController.getGoal)

//Update a single goal
router.put('/:_id', isLoggedIn, goalController.updateGoal)

//Delete one single goal
router.delete('/:_id', isLoggedIn, goalController.deleteGoal);

module.exports = router;