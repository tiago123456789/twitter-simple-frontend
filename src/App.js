import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Login from "./pages/Login";
import Timeline from "./pages/Timeline";

class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route path="/timeline" component={Timeline} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
