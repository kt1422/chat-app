const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = new Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
        required: true
    }
}, {timestamps: true});

const Chat = mongoose.model("Chats", chatSchema);
module.exports = Chat;