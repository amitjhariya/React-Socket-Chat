import "./css/App.css";
import { Routes, Route } from "react-router-dom"
import Login from "./components/Auth/Login";
import PrivateOutlet from "./components/Auth/PrivateRoute"
import Messenger from './components/Chat/Messenger'



function App() {
  return (
    <Routes>
      <Route path="/" element={ <Base/> } />
        <Route  element={<PrivateOutlet />}>
          <Route path="/chat" element={ <Messenger/> } />
        </Route>        
        <Route path="/auth" element={ <Login/> } />
      </Routes>    
  );
}

function Base(){
  return <h1>Hello</h1>
}




export default App;
