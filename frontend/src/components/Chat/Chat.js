import React, { useState } from "react";
import { useSocket, sendMessage, useUser } from "./../../hooks/useSocket";

function Chat() {
  const [message, setMessages] = useState("");
  const messages = useSocket();
  const user = useUser();
  const handleChange = (e) => {
    setMessages(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let userData = {};
    if (user === "q1") {
      userData.from = "q1";
      userData.to = "q2";
    } else {
      userData.from = "q2";
      userData.to = "q1";
    }
    const data = { from: userData.from, to: userData.to, text: `${message}` };
    sendMessage("message", data);
    setMessages("");
  };
  return (
    <main>
      <h1>User :{user}</h1>

      <div className="messages">
            {messages.map((item,i)=>{
                return (
                <div key={i}>
                    <p >{item.text} </p>
                </div>
                )
            })}
        </div>
      <form onSubmit={handleSubmit}>
        <input name="message" value={message} onChange={handleChange} />
      </form>
    </main>
  );
}

export default Chat;
