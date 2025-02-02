import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Vote from "./pages/Vote";
import Admin from "./Admin"

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
