import { useEffect, useMemo, useState } from "react";
import axios from "axios";

function ChatBox({chat, username}) {
    const [message, setMessage] = useState("");
    const [fetchedMessages, setFetchedMessages] = useState([]);

    const messages = useMemo(() => fetchedMessages, [fetchedMessages]);

    useEffect(() => {
        let timerId;

        try {
            timerId = setInterval(async () => {
                const response1 = await axios.get("http://localhost:3001/refresh/", {
                    // signal: refreshController.signal,
                    withCredentials: true,
                    credentials: "include",
                });
                localStorage.removeItem("accessToken");
                localStorage.setItem("accessToken", response1.data.accessToken);

                const chatId = chat._id;
                const response2 = await axios.get("http://localhost:3001/messages/", {
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

                setFetchedMessages(response2?.data?.messages);
            }, 500)
        } catch(error) {
            clearInterval(timerId);
        }

        return () => {
            clearInterval(timerId);
        }
    })

    async function handleButtonClick() {
        setMessage("");

        if(message === "") {
            return;
        }

        try {
            const response1 = await axios.get("http://localhost:3001/refresh/", {
                // signal: refreshController.signal,
                withCredentials: true,
                credentials: "include",
            });
            localStorage.removeItem("accessToken");
            localStorage.setItem("accessToken", response1.data.accessToken);

            await axios.post(
                "http://localhost:3001/message/",
                {
                    message: message,
                    destinationUsername: chat.firstUser === username ? chat.secondUser : chat.firstUser, 
                    chatId: chat._id,
                    time: new Date(Date.now()),
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
        } catch(error) {
            console.error(error);
        }
    }

    return (
        <div className="chatbox">
            <div className="chatbox_messages">
            {
                messages.map((oneMessage, index) => {
                    const isOwnMessage = oneMessage.sourceUsername === username ? true : false;
                    const messageStyle = isOwnMessage ? "chatbox_message_own_box" : "chatbox_message_box";

                    const messageDate = new Date(Date.parse(oneMessage.date));
                    const messageDateFormated = `${messageDate.getDate()}-${messageDate.getMonth()}-${messageDate.getFullYear()} ${messageDate.getHours()}:${messageDate.getMinutes()}`;
                    return (
                        <div key={index} className={messageStyle}>
                            <div className="chatbox_message">
                                {
                                    !isOwnMessage &&
                                        <div className="pfp" />
                                }

                                <div className="chatbox_message_textbox">
                                    <div className="chatbox_message_name">
                                        {oneMessage.sourceUsername}
                                    </div>
                                    <div className="chatbox_message_text">
                                        {oneMessage.text}
                                    </div>
                                    <div className="chatbox_message_date">
                                        {messageDateFormated}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            </div>

            <div className="chatbox_input">
                <input
                    id="input" 
                    type="text" name="message" 
                    value={message} placeholder="Message"
                    className="chatbox_input_input"
                    onChange={(e) => setMessage(e.target.value)}
                />

                <button id="button" className="chatbox_button" onClick={handleButtonClick}>Send</button>
            </div>
        </div>
    )
}

export default ChatBox;