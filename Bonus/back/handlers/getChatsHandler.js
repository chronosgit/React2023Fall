const Models = require("../models");

const handleGetChats = async (req, res) => {
    try {
        const requestingUser = await Models.User.findOne({username: req.user.username});

        const chats = [];
        for(let i = 0; i < requestingUser.chats.length; i++) {
            const userChat = await Models.Chat.findOne({_id: requestingUser.chats[i]});

            chats.push(userChat);
        }

        res.json({chats});
    } catch(error) {
        console.error(error);
        res.status(500).json({error: "Getting the user's chats resulted in error"});
    }
};

module.exports = handleGetChats;