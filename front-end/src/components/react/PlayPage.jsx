import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";
import "./css/PlayPage.css";
import beerImage from "../assets/Pinta.png";

const PlayPage = () => {
  const [regoleOpen, setRegoleOpen] = useState(false);
  const [selectedMalts, setSelectedMalts] = useState([]);
  const [selectedHops, setSelectedHops] = useState([]);
  const [selectedYeast, setSelectedYeast] = useState(null);

  // Da sostituire con dati database
  const maltsOptions = ["Malto Chiaro", "Malto Scuro", "Malto Rosso"];
  const hopsOptions = ["Luppolo Amarillo", "Luppolo Cascade", "Luppolo Simcoe"];
  const yeastOptions = ["Lievito Ale", "Lievito Lager"];

  const toggleRegole = () => setRegoleOpen(!regoleOpen);

  const handleMaltsChange = (malto) => {
    setSelectedMalts((prev) => {
      if (prev.includes(malto)) {
        return prev.filter((m) => m !== malto);
      } else if (prev.length < 3) {
        return [...prev, malto];
      }
      return prev;
    });
  };

  const handleHopsChange = (luppolo) => {
    setSelectedHops((prev) => {
      if (prev.includes(luppolo)) {
        return prev.filter((h) => h !== luppolo);
      } else if (prev.length < 4) {
        return [...prev, luppolo];
      }
      return prev;
    });
  };

  const handleYeastChange = (lievito) => {
    setSelectedYeast(lievito);
  };

  // Funzione per colore birra
  const getBeerColor = () => {
    if (selectedMalts.includes("Malto Scuro")) return "brown"; // Colore scuro
    if (selectedMalts.includes("Malto Rosso")) return "red"; // Colore rosso
    return "gold"; // Colore chiaro
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f0f0f0" }}>
      {/* Barra nera con menu */}
      <header className="bg-dark text-white py-2">
        <nav className="container d-flex justify-content-end">
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

      {/* Layout principale */}
      <div
        className="d-flex flex-row justify-content-between align-items-center"
        style={{ minHeight: "100vh", padding: "0 20px" }}>
        {/* Sezione della pinta di birra */}
        <div
          style={{
            flex: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <div
            style={{
              width: "250px",
              height: "400px",
              backgroundColor: getBeerColor(),
              borderRadius: "10px",
              position: "relative",
            }}>
            <img
              src={beerImage}
              alt="Pinta di Birra"
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "10px",
                position: "absolute",
                top: 0,
                left: 0,
                opacity: 0.5,
              }}
            />
          </div>
        </div>

        {/* Sezione dei pulsanti */}
        <div
          style={{
            flex: "1",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
          <button
            className="btn btn-primary my-3"
            style={{ width: "200px", height: "200px" }}
            onClick={() => handleMaltsChange("Malto Chiaro")}>
            Malti
          </button>
          <button
            className="btn btn-success my-3"
            style={{ width: "200px", height: "200px" }}
            onClick={() => handleHopsChange("Luppolo Amarillo")}>
            Luppoli
          </button>
          <button
            className="btn btn-danger my-3"
            style={{ width: "200px", height: "200px" }}
            onClick={() => handleYeastChange("Lievito Ale")}>
            Lieviti
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;
