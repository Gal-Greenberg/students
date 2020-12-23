import React, { Component } from "react";
import "./App.css";

import { Router, Route, Switch } from "react-router-dom";

import { Students } from "./components/Students"
import { Student } from "./components/Student"

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ Students } />
          <Route exact path="" component={ Student } />
        </Switch>
      </Router>
    );
  }
}

export default App;
