const Models = require("../models");

const handleUserLogout = async (req, res) => {
    const cookies = req.cookies;
    if(!cookies?.JWT) {
        res.sendStatus(200);
    } else {
        const refreshToken = cookies.JWT;

        try {
            const foundUser = await Models.User.findOne({refreshToken: refreshToken});

            if(!foundUser) {
                res.clearCookie("JWT", {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, domain: "localhost", path: "/"});
                res.sendStatus(200);
            } else {
                foundUser.refreshToken = "";
                foundUser.save();
        
                res.clearCookie("JWT", {httpOnly: true, maxAge: 24 * 60 * 60 * 1000, domain: "localhost", path: "/"});
                res.sendStatus(200);
            }
        } catch(error) {
            console.log(error);
            res.status(500).send({error: "Logouting resulted in error"});
        }
    }
};

module.exports = handleUserLogout;