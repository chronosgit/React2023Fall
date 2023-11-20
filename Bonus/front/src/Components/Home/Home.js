import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { LineWave } from "react-loader-spinner";

import Searchbar from "../Searchbar/Searchbar";
import ChatBox from "../ChatBox/ChatBox";

function Home(props) {
    const navigate = useNavigate();

    const {context} = props;
    const userFromContext = useContext(context);
    const {user, setUser} = userFromContext;

    const [users, setUsers] = useState([]);
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState({});

    useEffect(() => { // get data every 500ms
        if(Object.keys(user).length === 0 && !localStorage.getItem("accessToken")) { // incase some user data in client is corrupted - logout
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
            return;
        }

        let timerId;
        try {
            timerId = setInterval(async () => {
                const response1 = await axios.get("http://localhost:3001/refresh/", {
                        // signal: refreshController.signal,
                        withCredentials: true
                }).catch(error => navigate("/error"));
                localStorage.removeItem("accessToken");
                localStorage.setItem("accessToken", response1?.data.accessToken);

                const username = user.username;
                const updatedUser = await axios.get("http://localhost:3001/user/", {
                    withCredentials: true,
                    credentials: "include",
                    params: {
                        username
                    },
                });
    
                localStorage.removeItem("user");
                localStorage.setItem("user", JSON.stringify(updatedUser?.data));
                setUser(updatedUser?.data);

                const response2 = await axios.get(
                    "http://localhost:3001/chats/",
                    {
                        withCredentials: true,
                        credentials: "include",
                        headers: {
                            "Content-Type": "application/json; charset=UTF-8",
                            'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                        },
                    }
                );

                const chats = response2?.data?.chats;
                setChats(chats);
            }, 500);
        } catch(error) {
            console.error(error.status);

            if(error.message !== "Request failed with status code 404") {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("user");
                document.cookie = "JWT= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
                setUser({});
            }

            clearInterval(timerId);
        }

        return () => {
            clearInterval(timerId);
        }
    });

    async function handleClickUser(username) {
        try {
            const response1 = await axios.get("http://localhost:3001/refresh/", {
                withCredentials: true,
                credentials: "include",
            });
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", response1.data.accessToken);

            const response2 = await axios.post(
                "http://localhost:3001/chat/", 
                {
                    sourceUsername: user.username,
                    destinationUsername: username,
                }, 
                {
                    withCredentials: true,
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json; charset=UTF-8",
                        'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
                    },
                }
            );
            localStorage.removeItem("user");
            localStorage.setItem("user", JSON.stringify(response2.data.user));
            setUser(response2.data.user);
        } catch(error) {
            console.error(error);
        }
    }

    async function handleChatDelete(chatId) {
        const response1 = await axios.get("http://localhost:3001/refresh/", {
                withCredentials: true
        });
        localStorage.removeItem("accessToken");
        localStorage.setItem("accessToken", response1.data.accessToken);

        await axios.delete("http://localhost:3001/chat/", {
            withCredentials: true,
            credentials: "include",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                'Authorization': `Bearer ${localStorage.getItem("accessToken")}`,
            },
            params: {
                chatId,
            }
        });

        setChats(current =>
            current.filter(chat => {
                return chat._id !== chatId;
            }),
        );

        if(Object.keys(selectedChat).length > 0) {
            if(selectedChat._id === chatId) {
                setSelectedChat({});
            }
        }
    }

    function handleClickChat(chat) {
        setSelectedChat(chat);
    }

    return (
        <div className="home">
            <div className="sidebar">
                {
                    Object.keys(user).length > 0 ? // if user exists (not {})
                        <>
                        <Searchbar setUsers={setUsers} />

                        {
                            users.length > 0 &&
                                <div className="sidebar_users">
                                    {
                                        users.map((user, index) => {
                                            return (
                                                <div key={index} className="sidebar_user" onClick={() => handleClickUser(user.username)}>
                                                    {user.username}
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                        }

                        {
                            chats?.length > 0 ? // if the user actually has active chats
                                <div className="sidebar_chats">
                                    {
                                        chats.map((chat, index) => {
                                            const destinationUser = (chat.firstUser === user.username) ? chat.secondUser : chat.firstUser;

                                            return (
                                                <div key={index} className="sidebar_chat">
                                                    <div className="sidebar_chat_content" onClick={() => handleClickChat(chat)}>
                                                        <div className="friend_pfp" />
                                                        <div className="sidebar_chat_text">
                                                            <p className="friend_name">{destinationUser}</p>
                                                            {
                                                                chat.lastMessageText && <p className="friend_lastMessage">{chat.lastMessageText}</p>
                                                            }
                                                        </div>
                                                    </div>
                                                    <button className="sidebar_chat_delete" onClick={() => handleChatDelete(chat._id)}>Delete</button>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            :
                            <LineWave
                                height="100"
                                width="100"
                                color="white"
                                ariaLabel="line-wave"
                                wrapperStyle={{}}
                                wrapperClass=""
                                visible={true}
                            /> // this animation is permanent, until chats will be added to user
                        }
                        </>
                    : 
                        window.location.href === "http://localhost:3000/" &&
                            <a href="/signin" className="sidebar_warning">
                                Please authenticate to see your chats!
                            </a>
                }
            </div>

            {
                Object.keys(user).length > 0 && Object.keys(selectedChat).length > 0 &&
                    <div className="chatbox_wrapper">
                        <ChatBox chat={selectedChat} username={user.username} />
                    </div>
            }
        </div>
    )
}

export default Home;