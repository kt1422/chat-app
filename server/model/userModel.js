const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pic: {
        type: String
    },
    password: {
        type: String,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model("Users", userSchema);
module.exports = User;