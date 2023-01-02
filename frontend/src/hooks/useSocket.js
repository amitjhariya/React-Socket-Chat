import io from "socket.io-client";
import { useState, useEffect } from "react";

import { isAuth } from "./../utils/auth";
import { getUserByID } from "./../api/user";

const url = "http://localhost:8000";
const socket = io(url);

const cache = {};

const getSenderPic = async (id) => {
  if (id in cache) {
    return cache[id].photo;
  }
  cache[id] = await getUserByID(id);
  return cache[id].photo;
};

function useSocket() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", async (msg) => {
      // console.log("recived msg", msg);
      console.log(messages[messages.length - 1])
      let newMessege = { type: "left", text: msg.text };
      if (
        messages?.length &&
        messages[messages.length - 1].type === 'right'
      ) {
        console.log("Show ")
        newMessege.photo = await getSenderPic(msg.from);
      } 
      setMessages((prevMessages) => [...prevMessages, newMessege]);
    });

    socket.on("connection", (data) => {
      console.log(data);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  return { messages, setMessages };
}
function useUser() {
  const [user, setUser] = useState("");
  useEffect(() => {
    let Auth = isAuth();
    setUser(Auth);
    console.log(Auth);
    socket.emit("login", Auth);
  }, []);
  return user;
}

async function sendMessage(type, data) {
  socket.emit(type, data);
}

export { useSocket, sendMessage, useUser };
