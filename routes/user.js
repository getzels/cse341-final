const express = require('express');
const router = express.Router();
const userController =  require('../controller/user');
const passport = require("passport");
const isLoggedIn = require("./authentication").isLoggedIn;

router.use(passport.initialize());
router.use(passport.session());


//Create a user
router.post('/', isLoggedIn, userController.createUser)

//Get all users
router.get('/',isLoggedIn, userController.getUsers)

//Get one single user
router.get('/:_id',isLoggedIn, userController.getUser)

//Delete one single user
router.delete('/:_id',isLoggedIn, userController.deleteUser);

module.exports = router;