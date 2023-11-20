const Models = require("../models");

const handleCreateMessage = async (req, res) => {
    try {
        const {message, destinationUsername, chatId, time} = req.body;
        const sourceUsername = req.user.username;
        const timeStamp = Date.parse(time);
        const date = new Date(timeStamp)

        const chat = await Models.Chat.findOne({_id: chatId});
        const sourceUser = await Models.User.findOne({username: sourceUsername});
        const destinationUser = await Models.User.findOne({username: destinationUsername});

        const newMessage = await Models.Message.create({
            sourceUser: sourceUser, destinationUser: destinationUser,
            sourceUsername: sourceUsername, destinationUsername: destinationUsername,
            text: message, date: date,
        })
        chat.messages.push(newMessage);
        chat.lastMessage = newMessage;
        chat.lastMessageText = message;
        await chat.save();

        let isExists = false;
        
        for(let i = 0; i < destinationUser.chats.length; i++) {
            if(destinationUser.chats[i]._id == chatId) {
                isExists = true;
                break;
            }
        }

        if(!isExists) {
            destinationUser.chats.push(chat);
            destinationUser.save();
        }

        res.sendStatus(200);
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Creating the message resulted in error"});
    }
};

module.exports = handleCreateMessage;