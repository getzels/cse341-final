//require express-validator
const { check } = require('express-validator');

exports.signupValidation = [
    check('firstName', 'First name is requied').not().isEmpty(),
    check('lastName', 'Last name is requied').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    //check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

exports.loginValidation = [
    check('email', 'Please include a valid email').isEmail().normalizeEmail({ gmail_remove_dots: true }),
    //check('password', 'Password must be 6 or more characters').isLength({ min: 6 })
]

exports.bookValidation = [
    check('title', 'Title is requied').not().isEmpty(),
    check('publisher', 'Publisher is requied').not().isEmpty(),
    check('publishDate', 'Publish date is requied').not().isEmpty(),
    check('type', 'Type is requied').not().isEmpty(),
    check('goal', 'Goal is requied').not().isEmpty()
]

exports.directoryValidation = [
    check('note', 'Note is requied').not().isEmpty(),
    check('books', 'Book is requied').not().isEmpty()
]

exports.readingGoalValidation = [
    check.Result('description', 'Description is requied').not().isEmpty(),
    check.Result('startDate', 'Start date is requied').not().isEmpty(),
    check.Result('endDate', 'End date is requied').not().isEmpty(),
    check.Result('book', 'Book is requied').not().isEmpty()
]