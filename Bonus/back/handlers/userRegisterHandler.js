const jwt = require("jsonwebtoken");
require('dotenv').config();

const Models = require("../models");

const handleUserRegister = async (req, res) => {
    const {username, password} = req.body;

    try {
        const existingUser = await Models.User.findOne({username: username});

        if(existingUser) {
            res.status(400).send({error: "The user with such username already exists"})
        } else {
            const payload = {
                username: username
            };
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" } );
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "1d" } );

            const user = new Models.User({
                username: username, 
                password: password, 
                refreshToken: refreshToken,
            });
            await user.save();

            const userToReturn = {
                id: user._id,
                username: user.username,
                chats: user.chats,
            }
    
            res.cookie("JWT", refreshToken, {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, domain: "localhost", path: "/"}); // maxAge of 1 day
            res.json({accessToken, userToReturn});
        }
    } catch(error) {
        console.log(error);
        res.status(500).send({error: "Registering resulted in error"});
    }
}

module.exports = handleUserRegister;