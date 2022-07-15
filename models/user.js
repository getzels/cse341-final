const findOrCreate = require("mongoose-findorcreate");
const mongoose = require('mongoose');

// let UserSchema = new mongoose.Schema({
//    firstName:{
//     type: String
//    },
//    lastName:{
//     type: String
//    },
//    email:{
//     type: String
//    },
//    directory: [
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'directory'
//     }
//    ]
// }, {timestamps: true}
// );


let UserSchema = new mongoose.Schema(
    {
        id: String,
        firstName: String,
        lastName: String,
        email: String
    },
    { timestamps: true }
);
UserSchema.plugin(findOrCreate);
module.exports = mongoose.model('user', UserSchema);