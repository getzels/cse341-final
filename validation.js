//require express-validator
const { check } = require('express-validator');

exports.bookValidation = [
    check('name', 'Title is requied').not().isEmpty(),
    check('publisher', 'Publisher is requied').not().isEmpty(),
    check('publishDate', 'Publish date is requied').not().isEmpty(),
    check('type', 'Type is requied').not().isEmpty()
]


exports.readingGoalValidation = [
    check('description', 'Description is requied').not().isEmpty(),
    check('startDate', 'Start date is requied').not().isEmpty(),
    check('endDate', 'End date is requied').not().isEmpty()
]
