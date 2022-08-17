import io from "socket.io-client";
import { useState } from "react";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3002");

export default function App({reservations, ownerName}) {
  const [name, setName] = useState(1);
  const [room, setRoom] = useState("");
  const [showChats, setShowChats] = useState(false);

  // console.log("Name: ", name);
  
  console.log("ROOM: ", room)

  const joinChat = () => {
    if (ownerName && name) {
      setRoom(Math.random)
      socket.emit("join_chat", room);
      setShowChats(true);
    }
  };
  return (
    <div className="App">
       <div className="add-tool-button-div">
      {/* <!-- Button trigger modal --> */}
      <button
        type="button"
        className="button-edit"
        data-toggle="modal"
        data-target={`#edittoolmodal${ownerName}`}
        onClick={joinChat}
      >
        Contact Owner
      </button>
      </div>
      {!showChats ? (
        <div className="joinChatContainer ">
          {/* <input
            type="text"

            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input> */}
          {/* <input
            type="text"
            placeholder="Room ID..."
            onChange={(e) => {
              setRoom(e.target.value);
            }}
          ></input> */}

        </div>
      ) : (
        <div className="modal fade"
        id={`edittoolmodal${ownerName}`}
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true">>
        <Chat socket={socket} name={name} room={room} />
        </div>
      )}
    </div>
  );
}
