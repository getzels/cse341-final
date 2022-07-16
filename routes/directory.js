const express = require('express');
const router = express.Router();
const directoryController =  require('../controller/directory');
const passport = require("passport");
const isLoggedIn = require("./authentication").isLoggedIn;

router.use(passport.initialize());
router.use(passport.session());


//Create a new directory
router.post('/:_id', isLoggedIn, directoryController.createDirectory)

//Get directory by user only
router.get('/userDirectory', isLoggedIn, directoryController.getDirectory)

//Get all directories
router.get('/userDirectory', isLoggedIn, directoryController.getDirectory)

//Delete user directory
router.delete('/', isLoggedIn, directoryController.deleteDirectory)

//Delete book
//in progress
// router.delete('/:_id', isLoggedIn, directoryController.deleteBook)

module.exports = router;