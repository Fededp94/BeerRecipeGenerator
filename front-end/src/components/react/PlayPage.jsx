import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../css/PlayPage.css";
import beerImage from "../../assets/Pinta.png";

const PlayPage = () => {
  const [regoleOpen, setRegoleOpen] = useState(false);
  const [showMaltsDropdown, setShowMaltsDropdown] = useState(false);
  const [showHopsDropdown, setShowHopsDropdown] = useState(false);
  const [showYeastDropdown, setShowYeastDropdown] = useState(false);
  const [selectedMalts, setSelectedMalts] = useState([]);
  const [selectedHops, setSelectedHops] = useState([]);
  const [selectedYeast, setSelectedYeast] = useState(null);

  const maltsOptions = ["Malto Chiaro", "Malto Scuro", "Malto Rosso"];
  const hopsOptions = ["Luppolo Amarillo", "Luppolo Cascade", "Luppolo Simcoe"];
  const yeastOptions = ["Lievito Ale", "Lievito Lager"];

  const toggleRegole = () => setRegoleOpen(!regoleOpen);
  const toggleDropdown = (type) => {
    if (type === "malts") setShowMaltsDropdown(!showMaltsDropdown);
    if (type === "hops") setShowHopsDropdown(!showHopsDropdown);
    if (type === "yeast") setShowYeastDropdown(!showYeastDropdown);
  };

  const handleMaltsChange = (malto) => {
    setSelectedMalts((prev) => {
      if (prev.includes(malto)) return prev.filter((m) => m !== malto);
      else if (prev.length < 3) return [...prev, malto];
      return prev;
    });
  };

  const handleHopsChange = (luppolo) => {
    setSelectedHops((prev) => {
      if (prev.includes(luppolo)) return prev.filter((h) => h !== luppolo);
      else if (prev.length < 4) return [...prev, luppolo];
      return prev;
    });
  };

  const handleYeastChange = (lievito) => {
    setSelectedYeast(lievito);
  };

  const getBeerColor = () => {
    if (selectedMalts.includes("Malto Scuro")) return "brown";
    if (selectedMalts.includes("Malto Rosso")) return "red";
    return "gold";
  };

  return (
    <div
      id="play-page-container"
      className="container-fluid p-0"
      style={{ backgroundColor: "#f0f0f0" }}>
      <header className="bg-dark text-white py-2">
        <nav className="container d-flex justify-content-end navbar">
          <ul className="navbar-nav d-flex flex-row">
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="rulesDropdown"
                role="button"
                aria-expanded={regoleOpen}
                onClick={toggleRegole}>
                Regole
              </a>
              {regoleOpen && (
                <ul className="dropdown-menu show">
                  <li>
                    <a className="dropdown-item" href="#">
                      Regola 1
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Regola 2
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Regola 3
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <div
        className="d-flex justify-content-between align-items-center"
        style={{ minHeight: "100vh", padding: "20px" }}>
        <div className="buttons-container">
          <div className="dropdown">
            <button
              className="btn malts-btn"
              onClick={() => toggleDropdown("malts")}>
              Malto
            </button>
            {showMaltsDropdown && (
              <div className="dropdown-content show">
                {maltsOptions.map((malto) => (
                  <a
                    key={malto}
                    href="#"
                    onClick={() => handleMaltsChange(malto)}>
                    {malto}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="dropdown">
            <button
              className="btn hops-btn"
              onClick={() => toggleDropdown("hops")}>
              Luppoli
            </button>
            {showHopsDropdown && (
              <div className="dropdown-content show">
                {hopsOptions.map((luppolo) => (
                  <a
                    key={luppolo}
                    href="#"
                    onClick={() => handleHopsChange(luppolo)}>
                    {luppolo}
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="dropdown">
            <button
              className="btn yeast-btn"
              onClick={() => toggleDropdown("yeast")}>
              Lievito
            </button>
            {showYeastDropdown && (
              <div className="dropdown-content show">
                {yeastOptions.map((lievito) => (
                  <a
                    key={lievito}
                    href="#"
                    onClick={() => handleYeastChange(lievito)}>
                    {lievito}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="pinta-container">
          <div>
            <img src={beerImage} alt="Pinta di Birra" className="beer-image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;
