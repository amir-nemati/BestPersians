import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Streamer from "./pages/Streamer";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/streamer" component={Streamer} />
      </Switch>
    </Router>
  );
};

export default App;