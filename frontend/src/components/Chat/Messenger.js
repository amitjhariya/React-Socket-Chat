import React,{useState} from "react";
import Groups from "./Groups";
import Messages from "./Messages";
import Header from "./Header";
function Messenger() {
  const [selectedGroup, setSelectedGroup] = useState('')
  
    return(
        <div className="chat-simulation">
          <Header />
          <div className="chat-workspace">
            <br />
            <div className="chat-container">
              <Messages group={selectedGroup}/>
              <Groups selected={selectedGroup} select={setSelectedGroup} />
            </div>
          </div>
        </div>
      )
}

export default Messenger