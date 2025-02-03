import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import stream from "./pages/Vote"
import Admin from "./Admin"
import Vote from "./pages/Vote";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/vote" element={<Vote />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  );
};

export default App;
