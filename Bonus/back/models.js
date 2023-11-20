const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    chats: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Chat", default: [],},
    ],
    refreshToken: String,
});
const User = mongoose.model("User", userSchema);

const messageSchema = new mongoose.Schema({
    sourceUser: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    sourceUsername: String,
    destinationUser: {type: mongoose.Schema.Types.ObjectId, ref: "User"},
    destinationUsername: String,
    text: String,
    date: Date,
});
const Message = mongoose.model("Message", messageSchema);


const chatSchema = new mongoose.Schema({
    firstUser: String,
    secondUser: String,
    messages: [
        {type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [],},
    ],
    lastMessage: {
        type: mongoose.Schema.Types.ObjectId, ref:"User", default: null,
    },
    lastMessageText: String,
});
const Chat = mongoose.model("Chat", chatSchema);

module.exports = {User, Message, Chat};