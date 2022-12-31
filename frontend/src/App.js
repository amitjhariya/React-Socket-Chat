import "./css/App.css";
// import Chat from './components/Chat';
// import ChatGroups from './components/ChatGroups';
import Groups from "./components/Groups";
import Messages from "./components/Messages";
import Header from "./components/Header";

function App() {
  return (
    <div className="chat-simulation">
      <Header />
      <div className="chat-workspace">
        <br />
        <div className="chat-container">
          

          <Messages />
          <Groups />
        </div>
      </div>

      {/* <Chat/> */}
      {/* <ChatGroups/> */}
    </div>
  );
}

export default App;
