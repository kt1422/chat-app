const Chat = require("../model/chatModel");
const { checkDate } = require('../utils/checkDate');
const { checkUser } = require('../utils/checkUser');

const getMessage = async (req, res) => {
    const userId = req.getUser.id;
    const recipient = req.body.recipient
    if(userId){
        const rawMessages = await Chat.find({
            $or:[ 
                {sender: userId, recipient: recipient},
                {sender: recipient, recipient: userId}
            ]
        });
        const allMessages = [];
        for(let message of rawMessages){
            const obj = {
                sender: message.sender,
                message: message.message,
                date: checkDate(message.createdAt)
            }
            allMessages.push(obj);
        }
        res.send({
            status: "success",
            message: "Got all your messages",
            allMessages
        });
    } else {
        res.send({status: "error", msg: "No user"});
    }
}

const sendMessage = async (req, res) => {
    const userId = req.getUser.id;
    const recipient = req.body.recipient
    if(userId){
        const newChat = new Chat({
            sender: userId,
            recipient: req.body.recipient,
            message: req.body.message
        });
    
        await newChat.save();
        res.send({
            status: "success",
            message: "Your message has sent successfully!",
            newChat : {
                sender: newChat.sender,
                username: await checkUser(newChat.sender),
                recipient: newChat.recipient,
                message: newChat.message,
                date: checkDate(newChat.createdAt)
            }
        });
    } else {
        res.send({status: "error", msg: "No user"});
    }
}

module.exports = {
    getMessage,
    sendMessage
}