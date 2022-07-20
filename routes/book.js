const express = require('express');
const router = express.Router();
const {body, validationResult } = require('express-validator');
const bookController =  require('../controller/book');
const passport = require("passport");
const isLoggedIn = require("./authentication").isLoggedIn;
const {bookValidation} = require('../validation');

router.use(passport.initialize());
router.use(passport.session());

//Create a book
router.post('/', bookValidation,
     (req, res, next) => {
        // Finds the validation errors in this request and wraps them in an object with handy functions
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array()});
    }else{
        next()
    }}, isLoggedIn, bookController.createBook
    )

//Get all books
router.get('/', bookController.getBooks)

//Get one single book
router.get('/:_id', bookController.getBook)

//Update a single book
router.put('/:_id', isLoggedIn, bookController.updateBook)

//Delete one single book
router.delete('/:_id',isLoggedIn, bookController.deleteBook);

//Delete book from directory
// router.delete('/:_id', isLoggedIn, bookController.deleteBook);

module.exports = router;