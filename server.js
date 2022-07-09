require('dotenv').config();
const express = require("express");

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

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
});