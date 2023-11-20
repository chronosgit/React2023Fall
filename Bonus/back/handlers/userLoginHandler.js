const jwt = require("jsonwebtoken");
require('dotenv').config();

const Models = require("../models");

const handleUserLogin = async (req, res) => {
    const {username, password} = req.body;

    let user = {};

    try {
        user = await Models.User.findOne({username: username});

        if(!user) {
            res.status(404).send({error: "Such user doesn't exist"});
        } else if(user?.password !== password) {
            res.status(403).send({error: "Invalid password"});
        } else {
            delete user.password;
    
            const payload = {
                username: user.username
            }
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m",});
            const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d",});
            user.refreshToken = refreshToken; // store a user's new refresh token as well
            user.save();

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
        return res.status(500).send({error: "Logging in resulted in error"});
    }
}

module.exports = handleUserLogin;