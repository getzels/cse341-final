const express = require('express');
const router = express.Router();
const bookController =  require('../controller/book');
const passport = require("passport");
const isLoggedIn = require("./authentication").isLoggedIn;

router.use(passport.initialize());
router.use(passport.session());

//Create a book
router.post('/', isLoggedIn, bookController.createBook)

//Get all books
router.get('/', isLoggedIn, bookController.getBooks)

//Get one single book
router.get('/:_id', isLoggedIn, bookController.getBook)

//Update a single book
router.put('/:_id', isLoggedIn, bookController.updateBook)

//Delete one single book
router.delete('/:_id', isLoggedIn, bookController.deleteBook);

module.exports = router;