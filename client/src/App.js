import Home from "./Components/Home.js";
import Chatroom from "./Components/ChatRoom.js";
import { Switch, Route, Redirect } from "react-router-dom";
function App(props) {
  //
  return (
    <div id="maincontainer">
    <h1 id="apptitle">
      <a href="/">
        <span>Chat Till You Drop</span>
      </a>
    </h1>
    <div id="serverroutes">
    <Switch>
      <Route exact path="/"><Home/></Route>

      <Route
        path="/rooms/:id"
        children={(props) => {
          return props.match.isExact ? (
            <Chatroom match={props.match} />
          ) : (
            <Redirect to="/" />
          );
        }}
      />
    </Switch>
    </div></div>
  );
}

export default App;
