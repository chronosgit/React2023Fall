const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
require('dotenv').config();

const verifyJWT = require("./middleware/verifyJWT");
const refreshTokenHandler = require("./handlers/refreshTokenHandler");
const userLoginHandler = require("./handlers/userLoginHandler");
const userRegisterHandler = require("./handlers/userRegisterHandler");
const userLogoutHandler = require("./handlers/userLogoutHandler");
const searchHandler = require("./handlers/searchHandler");
const createChatHandler = require("./handlers/createChatHandler");
const getUserHandler = require("./handlers/getUserHandler");
const getChatsHandler = require("./handlers/getChatsHandler");
const createMessageHandler = require("./handlers/createMessageHandler");
const deleteChatHandler = require("./handlers/deleteChatHandler");
const getMessagesHandler = require("./handlers/getMessagesHandler");

const Models = require("./models");

mongoose.connect("mongodb://127.0.0.1:27017/redemptionarc");

const app = express();
const PORT = "3001";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
const corsOptions ={
    origin: 'http://localhost:3000', 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));



app.listen(PORT, (req, res) => {
    console.log(`Server is listening on port ${PORT}`);
});

app.get("/refresh/", refreshTokenHandler);

app.post("/auth/login/", userLoginHandler);

app.post("/auth/register/", userRegisterHandler);

app.get("/auth/logout/", userLogoutHandler);

app.get("/search/", verifyJWT, searchHandler);

app.post("/chat/", verifyJWT, createChatHandler);

app.get("/user/", getUserHandler);

app.get("/chats/", verifyJWT, getChatsHandler);

app.post("/message/", verifyJWT, createMessageHandler);

app.delete('/chat/', verifyJWT, deleteChatHandler);

app.get("/messages/", verifyJWT, getMessagesHandler);