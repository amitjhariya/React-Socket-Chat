import React, { useState, useEffect, useRef } from "react";
import { getMessages } from "../../api/group";
import { useSocket, sendMessage, useUser } from "./../../hooks/useSocket";
import MessageHeader from "./Message/Header";
import moment from "moment";

function MessagesBox({ group }) {
  const [text, setText] = useState("");
  const { messages, setMessages, cache, setCache, getSenderPic } = useSocket();
  const user = useUser();

  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const msgLoader = async () => {
    setMessages([]);
    const messages = await getMessages(group._id);

    for (let i = 0; i < messages.data.messages.length; i++) {
      const item = messages.data.messages[i];
      var time = moment(item.createdAt).format('MMM Do, h:mm a');
      let result = { text: item.text, type: "left",time };
      if (item.sender._id === user._id) {
        result.type = "right";
      }
      if (cache["lastUser"] !== item.sender._id) {
        if (item.sender._id === user._id) {
          result.photo = user.photo;
        } else {
          result.photo = await getSenderPic(item.sender._id);
        }
        cache["lastUser"] = item.sender._id;
      }

      setMessages((prevMessages) => [...prevMessages, result]);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!group || !text) return;
    const data = { from: user._id, to: group._id, text: `${text}` };
    sendMessage("message", data);
    const time = moment().format("MMM Do, h:mm a");

    let newMessege = { type: "right", time, text, photo: user.photo };
    if (
      messages &&
      messages.length &&
      messages[messages.length - 1].type === "right"
    ) {
      newMessege = { type: "right", text, time };
    }
    setCache(user._id);

    setMessages([...messages, newMessege]);

    setText("");
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // console.log("LOAD MESSAGES FROM DB");
    group && group._id && msgLoader();
  }, [group]);
  return (
    <div className="messages-workspace">
      <MessageHeader name={group.name} image={group.image} />
      <div className="active-guest-messages">
        <div className="chat-datetime">
          
          {messages.map((item, i) => {
            return (
              <div className="chat-msg-user-contact" key={i}>
                <div
                  className={`${item.type}-chat-msg`}
                  style={{ marginTop: 15, marginBottom: 5 }}
                >
                  {item.photo && (
                    <div className="user-profil">
                      <img src={item.photo} alt="Profile" />
                    </div>
                  )}
                  <div className="chat-msg-data">
                    <label className="chat-text">{item.text}</label>
                    <div className="chat-msg-time">{item.time}</div>
                  </div>
                </div>
              </div>
            );
          })}
          <div className="msgRef" ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="message-editior">
          <div className="msg-editor" title="Write your message here.">
            <input
              type="text"
              placeholder="Send a message..."
              value={text}
              onChange={handleChange}
            />
          </div>
          <div className="emoji-icon" title="Add an emoji expression.">
            <svg viewBox="0 0 496 512" width="24px" height="24px" fill="silver">
              <path
                d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm80 
          168c17.7 0 32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm-160 0c17.7 0 
          32 14.3 32 32s-14.3 32-32 32-32-14.3-32-32 14.3-32 32-32zm80 
          256c-60.6 0-134.5-38.3-143.8-93.3-2-11.8 9.3-21.6 20.7-17.9C155.1 330.5 200 336 248 
          336s92.9-5.5 123.1-15.2c11.3-3.7 22.6 6.1 20.7 17.9-9.3 55-83.2 93.3-143.8 93.3z"
              />
            </svg>
          </div>
          <div
            onClick={handleSubmit}
            className="sender-icon"
            title="Send this message."
          >
            <svg viewBox="0 0 24 24" width="36px" height="36px" fill="silver">
              <g>
                <path
                  d="M21.5,11.1l-17.9-9C2.7,1.7,1.7,2.5,2.1,3.4l2.5,6.7L16,12L4.6,13.9l-2.5,6.7c-0.3,0.9,0.6,
          1.7,1.5,1.2l17.9-9 C22.2,12.5,22.2,11.5,21.5,11.1z"
                />
              </g>
            </svg>
          </div>
        </div>
      </form>
    </div>
  );
}

export default MessagesBox;
