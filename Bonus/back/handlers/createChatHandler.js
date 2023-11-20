const Models = require("../models");

const handleChatCreate = async (req, res) => {
    try {
        const {sourceUsername, destinationUsername} = req.body;

        const sourceUser = await Models.User.findOne({username: sourceUsername});

        const user = {
            id: sourceUser._id,
            username: sourceUsername,
            chats: sourceUser.chats,
        }

        // check if such chat already exists - return it along with user (also add it to sourceUser chats)
        let chat = await Models.Chat.findOne({firstUser: sourceUsername, secondUser: destinationUsername});
        if(chat) {
            if(!sourceUser.chats.includes(chat._id)) {
                sourceUser.chats.push(chat);
                await sourceUser.save();
                user.chats.push(chat);
            }

            return res.json({user, chat});
        } else {
            chat = await Models.Chat.findOne({firstUser: destinationUsername, secondUser: sourceUsername});

            if(chat) {
                if(!sourceUser.chats.includes(chat._id)) {
                    sourceUser.chats.push(chat);
                    await sourceUser.save();
                    user.chats.push(chat);
                }

                return res.json({user, chat});
            }
        }

        chat = await Models.Chat.create({firstUser: sourceUsername, secondUser: destinationUsername});
        sourceUser.chats.push(chat);
        await sourceUser.save();
        user.chats.push(chat);

        res.json({user, chat}); // also return chat
    } catch(error) {
        console.log(error);
        return res.status(500).send({error: "Creating a chat resulted in error"});
    }
};

module.exports = handleChatCreate;