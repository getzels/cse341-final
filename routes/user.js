const express = require('express');
const router = express.Router();
const userController =  require('../controller/user');


//Create a user
router.post('/', userController.createUser)

//Get all users
router.get('/', userController.getUsers)

//Get one single user
router.get('/:_id', userController.getUser)

//Delete one single user
router.delete('/:_id', userController.deleteUser);

module.exports = router;