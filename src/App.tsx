import "./App.css";

import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Students } from "./components/Students"
import { EditStudent } from "./components/EditStudent"

import "./styles/styles.scss" 

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={ Students } />
      <Route exact path="/student" component={ EditStudent } />
    </Switch>
  </BrowserRouter>
)
export default App;
