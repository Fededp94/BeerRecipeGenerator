import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./components/App/App.css";
import HomePage from "./components/HomePage/HomePage.jsx";
import PlayPage from "./components/PlayPage/PlayPage.jsx";
import ResultPage from "./components/ResultPage/ResultPage.jsx";
import LeMieRicette from "./components/LeMieRicette/LeMieRicette.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play" element={<PlayPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/lemiericette" element={<LeMieRicette />} />
      </Routes>
    </Router>
  );
};

export default App;
