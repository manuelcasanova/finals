import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

export default function Chat({ socket, name, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: name,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData])
      console.log("sender message list", messageList)
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log("data received: ", data);
      setMessageList((list) => [...list, data])
      console.log("receiver message list: ", messageList)
    });
  }, []);
  

  return (
    <div className="chat-window">
     
      <div className="chat-header">
        <p>Share Chat</p>
      </div>
      <div className="chat-body">
        <ScrollToBottom className="message-container">
        {messageList.map((messageContent) => {
          // console.log("Content in div: ",messageContent)
          return <div className="message" id={name === messageContent.author ? "you" : "other"}>
          <div className="message-content">
            <p>{messageContent.message}</p>
            </div>
          <span className="message-meta">
            <p id="time">{messageContent.time}</p>
            <p id="author">{messageContent.author}</p>
          </span>
          </div>
        })}
        </ScrollToBottom>
      </div>
      
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder=""
          onChange={(e) => {
            setCurrentMessage(e.target.value);
          }}
          onKeyPress={(e) => {e.key === "Enter"  && sendMessage();
        }}
        />
        <button onClick={sendMessage}>&#128295;</button>
      </div>
    </div>
  );
}
