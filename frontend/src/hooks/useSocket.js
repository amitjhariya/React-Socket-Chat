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
  cache["lastUser"]=id
  return cache[id].photo;
};


function useSocket() {
  const [messages, setMessages] = useState([]);
  const setCache=(id)=>{
    cache["lastUser"]=id
  }

  useEffect(() => {
    socket.on("message", async (msg) => {
      // console.log("recived msg", msg);      
      let newMessege = { type: "left", text: msg.text };
      if (cache["lastUser"]!==msg.from) {
        newMessege.photo = await getSenderPic(msg.from);
        cache["lastUser"]=msg.from
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

  return { messages, setMessages,setCache};
}
function useUser() {
  const [user, setUser] = useState("");
  useEffect(() => {
    let Auth = isAuth();
    setUser(Auth);
    socket.emit("login", Auth);
  }, []);
  return user;
}

async function sendMessage(type, data) {
  socket.emit(type, data);
}

export { useSocket, sendMessage, useUser };
