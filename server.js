require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const swaggerAutogen = require('swagger-autogen')();
const session = require('express-session')

const cors = require('cors');
const db = require('./models');
db.mongoose.
connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to the database!');
    })
    .catch((err) => {
        console.log('Cannot connect to the database!', err);
        process.exit();
    });

const app = express();

const port = process.env.PORT || 3000
//hello

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.CLIENT_SECRET
}));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', require('./routes'))

// app.post('/controller/user.js', signupValidation, (req, res) => {
//     const { firstName, lastName, email } = req.body;
//     const user = new db.user({
//         firstName,
//         lastName,
//         email
//     });
// });

// bookValidation
// app.post('/controller/book.js', bookValidation, (req, res) => {
//     const { name, publishDate, publisher, type } = req.body;
//     const book = new db.book({
//         name,
//         publishDate,
//         publisher,
//         type
//     });
// }
// );

// directoryValidation
// app.post('/controller/directory.js', directoryValidation, (req, res) => {
//     const { note, books } = req.body;
//     const directory = new db.directory({
//         note,
//         books
//     });
// }
// );

// // readingGoalValidation
// app.post('/controller/readingGoal.js', readingGoalValidation, (req, res) => {
//     const { description, startDate, endDate, book } = req.body;
//     const readingGoal = new db.readingGoal({
//         description,
//         startDate,
//         endDate,
//         book
//     });
// }
// );


app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});
module.exports = app