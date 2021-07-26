//importing components
import Chatroom from "./Components/ChatRoom.js";
import { Switch, Route } from "react-router-dom";
import "./App.css";
function App() {
  //what to render with App
  return (
    <div id="maincontainer">
      <h1 id="apptitle">
        <a href="/rooms/main">
          <span>Chat Till You Drop</span>
        </a>
      </h1>
      <div id="serverroutes">
        <Switch>
          <Route exact path="/rooms/main"render={() => <Chatroom/>}>
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
