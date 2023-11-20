const Models = require("../models");

const handleChatCreate = async (req, res) => {
    try {
        const user = await Models.User.findOne({username: req.query.username});

        res.json({
            id: user._id,
            username: user.username,
            chats: user.chats,
        });
    } catch(error) {
        console.log(error);
        res.status(500).json({error: "Getting the user resulted in error"});
    }
};

module.exports = handleChatCreate;