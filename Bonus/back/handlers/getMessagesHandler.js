const Models = require("../models");

const handleGetMessages = async (req, res) => {
    try {
        const user = await Models.User.findOne({username: req.user.username});
        const chatId = req.query.chatId;

        const messages = await Models.Message.find().sort('date');

        res.json({messages});
    } catch(error) {
        console.log(error);
        return res.status(500).send({error: "Getting the messages resulted in error"});
    }
};

module.exports = handleGetMessages;