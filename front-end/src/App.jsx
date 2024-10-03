import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/react/HomePage";
import PlayPage from "./components/react/PlayPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play" element={<PlayPage />} />
      </Routes>
    </Router>
  );
};

export default App;
