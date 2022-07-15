const express = require('express');
const router = express.Router();
const directoryController =  require('../controller/directory');
const passport = require("passport");
const isLoggedIn = require("./authentication").isLoggedIn;

router.use(passport.initialize());
router.use(passport.session());

//will probably update routes later on
//Create a new directory
router.post('/:_id', isLoggedIn, directoryController.createDirectory)

//Get directory by user only
router.get('/', isLoggedIn, directoryController.getDirectory)

//Delete user directory
router.delete('/', isLoggedIn, directoryController.deleteDirectory)

module.exports = router;