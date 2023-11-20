const Models = require("../models");

const handleSearch = async (req, res) => {
    try {
        const searchQuery = req.query.searchQuery;

        if(searchQuery === "") { // empty query MUST be handled in client
            return res.sendStatus(204); 
        } else if(searchQuery === req.user.username) {
            return res.status(403).json({error: "You cannot search yourself"});
        } else {
            const data = [];
            const correspondingUsers = await Models.User.find(
                {
                    username: {"$regex": `${searchQuery}`, "$options": "i"}
                },
                "_id username chats"
            );

            correspondingUsers.forEach(user => {
                if(user.username !== req.user.username) {
                    data.push(user);
                }
            });
            res.json({data});
        }
    } catch(error) {
        console.log(error);
        res.status(500).send({error: "Search resulted in error"});
    }
};

module.exports = handleSearch;