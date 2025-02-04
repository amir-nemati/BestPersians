import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Admin from "./Admin"
import Vote from "./pages/Vote";
import Home from "./pages/Home";
import Youtubers from "./pages/Youtubers";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/vote" element={<Vote />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/youtubers" element={<Youtubers />} />
      </Routes>
    </Router>
  );
};

export default App;
