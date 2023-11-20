const Models = require("../models");

const handleChatDelete = async (req, res) => {
    try {
        const chatId = req.query.chatId;

        await Models.User.updateOne(
            {
                username: req.user.username,
            }, 
            {
                $pullAll: {
                    chats: [{_id: chatId}],
                },
            }
        );

        res.sendStatus(200);
    } catch(error) {
        console.log(error);
        return res.status(500).send({error: "Deleting a chat resulted in error"});
    }
};

module.exports = handleChatDelete;