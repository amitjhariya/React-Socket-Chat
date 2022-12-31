import io from 'socket.io-client';
import  { useState,useEffect } from 'react'
const url='http://localhost:8000'
const socket = io(url);


function useSocket() {
  const [messages, setMessages] = useState([]);  
   
  useEffect(() => {
    
    socket.on('message', (data) => {
      console.log('recived data',data)
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    socket.on('connection', (data) => {
      console.log(data)
    });

    return () => {
      socket.disconnect();
    };
  }, []); 

  return messages;
}
function useUser(){
  const [user, setUser] = useState('');
  useEffect(()=>{
    let username=localStorage.getItem('username')
    
    if(!username){
      username =window.prompt("Enter User Name")
      localStorage.setItem('username',username)
    }
    setUser(username)
    socket.emit('login',username)    
  },[user])
  
  return user;
}

function sendMessage(type, data){
  console.log(socket.emit(type, data))
}



export {useSocket,sendMessage,useUser}
