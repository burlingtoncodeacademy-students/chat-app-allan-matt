import './App.css';
import React from 'react';
import Main from "./Components/Main"
import Nav from "./Components/Nav"
import Gaming from "./Components/Gaming.js"
import { BrowserRouter, Switch, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="App">
     <BrowserRouter>
     <Nav />
     <Switch>
       <Route exact path ="/" />
       <Route path="/Main" component ={Main} />
       <Route path="/Gaming" component ={Gaming} />
     </Switch>
     </BrowserRouter>
    </div>
  );
}

export default App;
