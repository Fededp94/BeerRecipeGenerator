import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../App.css";
import "../css/PlayPage.css";
import pintaImage from "../../assets/PintaVuota.png";
import pintaChiaraImage from "../../assets/Pinta.png";
import pintaAmbrataImage from "../../assets/PintaAmbrata.png";
import pintaScuraImage from "../../assets/PintaScura.png";

const PlayPage = () => {
  const navigate = useNavigate(); //Funzione per la navigazione

  const [regoleOpen, setRegoleOpen] = useState(false);
  const [showMaltsDropdown, setShowMaltsDropdown] = useState(false);
  const [showHopsDropdown, setShowHopsDropdown] = useState(false);
  const [showYeastDropdown, setShowYeastDropdown] = useState(false);
  const [selectedMalts, setSelectedMalts] = useState([]);
  const [selectedHops, setSelectedHops] = useState([]);
  const [selectedYeast, setSelectedYeast] = useState(null);
  const [beerName, setBeerName] = useState("");
  const [error, setError] = useState("");

  // Opzioni per i malti
  const maltsOptions = [
    { type: "Malto Chiaro", malts: ["Malto Wheat", "Pilsner", "Pale Ale"] },
    { type: "Malto Ambrato", malts: ["Vienna", "Monaco", "Caramel"] },
    { type: "Malto Scuro", malts: ["Abbey", "Carafa III", "Chocolate"] },
  ];

  // Funzione per determinare l'immagine da visualizzare
  const getBeerImage = () => {
    const hasLightMalts = selectedMalts.some((malto) =>
      ["Malto Wheat", "Pilsner", "Pale Ale"].includes(malto)
    );
    const hasAmberMalts = selectedMalts.some((malto) =>
      ["Vienna", "Monaco", "Caramel"].includes(malto)
    );
    const hasDarkMalts = selectedMalts.some((malto) =>
      ["Abbey", "Carafa III", "Chocolate"].includes(malto)
    );

    if (hasDarkMalts) return pintaScuraImage;
    if (hasAmberMalts) return pintaAmbrataImage;
    if (hasLightMalts) return pintaChiaraImage;
    return pintaImage;
  };

  // Opzioni per i luppoli
  const hopsOptions = [
    {
      type: "Luppoli Base",
      hops: ["Saaz", "Styrian Golding", "Hallertau Magnum"],
    },
    { type: "Luppoli Agrumati", hops: ["Citra", "Hbc-630", "Wakatu"] },
    { type: "Luppoli Fruttati", hops: ["Wai-ti", "Mosaic", "Vic Secret"] },
  ];

  // Opzioni per i lieviti
  const yeastOptions = [
    { type: "Lievito Ale (Alta Fermentazione)", yeast: ["US-05"] },
    { type: "Lievito lager (Bassa Fermentazione)", yeast: ["Saflager w34/70"] },
  ];

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
    setError(""); // Resetta l'errore quando l'utente seleziona un malto
  };

  const handleHopsChange = (luppolo) => {
    setSelectedHops((prev) => {
      if (prev.includes(luppolo)) return prev.filter((h) => h !== luppolo);
      else if (prev.length < 4) return [...prev, luppolo];
      return prev;
    });
    setError(""); // Resetta l'errore quando l'utente seleziona un luppolo
  };

  const handleYeastChange = (lievito) => {
    setSelectedYeast(lievito);
    setError(""); // Resetta l'errore quando l'utente seleziona un lievito
  };

  const handleGenerateClick = () => {
    // Resetta eventuali errori precedenti
    setError("");

    // Verifico che tutti gli ingredienti necessari siano stati selezionati
    if (
      selectedMalts.length === 0 ||
      selectedHops.length === 0 ||
      !selectedYeast
    ) {
      let errorMessage = "Per favore seleziona:";
      if (selectedMalts.length === 0) errorMessage += "\n- Almeno un malto";
      if (selectedHops.length === 0) errorMessage += "\n- Almeno un luppolo";
      if (!selectedYeast) errorMessage += "\n- Almeno un lievito";

      setError(errorMessage);
      return; // Esce dalla funzione senza navigare
    }

    // Se tutti i controlli passano, naviga alla pagina successiva
    navigate("/result", {
      state: {
        malts: selectedMalts,
        hops: selectedHops,
        yeast: selectedYeast,
        beerName: beerName,
      },
    });
  };

  return (
    <div id="play-page-container" className="container-fluid p-0 play-page-bg">
      <header className="bg-dark text-white py-2">
        <nav className="container d-flex justify-content-between navbar">
          <div className="beer-name-input">
            <input
              type="text"
              placeholder="Il nome della tua birra!"
              className={beerName ? "input-filled" : "input-empty"}
              value={beerName}
              onChange={(e) => setBeerName(e.target.value)}
            />
          </div>
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
                    <a className="dropdown-item">
                      1. Selezionare i <strong>malti</strong> che si vogliono
                      inserire nella <br /> ricetta cliccando sul pulsante
                      <strong> Malti</strong>. &#40; Max. 3 &#41;
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      2. Selezionare i <strong>luppoli</strong> che si vogliono
                      inserire nella <br /> ricetta cliccando sul pulsante{" "}
                      <strong> Luppoli</strong>. &#40; Max. 4 &#41;
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      3. Scegliere uno dei due <strong>lieviti</strong> proposti
                      cliccando sul
                      <br /> pulsante <strong> Lieviti</strong>. &#40; Max. 1
                      &#41;
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      4. Premere <strong>Genera</strong>!
                    </a>
                  </li>
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <div
        className="d-flex justify-content-between align-items-center main-content"
        style={{ minHeight: "100vh", padding: "20px", position: "relative" }}>
        <div className="buttons-container">
          {/* Dropdown per Malti */}
          <div className="dropdown">
            <button
              className="btn malts-btn"
              onClick={() => toggleDropdown("malts")}>
              MALTI
            </button>
            {showMaltsDropdown && (
              <div className="dropdown-content show">
                {maltsOptions.map((malto) => (
                  <div key={malto.type}>
                    <strong>{malto.type}</strong>
                    <ul>
                      {malto.malts.map((m) => (
                        <li key={m}>
                          <a
                            href="#"
                            onClick={() => handleMaltsChange(m)}
                            className={
                              selectedMalts.includes(m) ? "selected" : ""
                            }>
                            {m}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown per Luppoli */}
          <div className="dropdown">
            <button
              className="btn hops-btn"
              onClick={() => toggleDropdown("hops")}>
              LUPPOLI
            </button>
            {showHopsDropdown && (
              <div className="dropdown-content show">
                {hopsOptions.map((hop) => (
                  <div key={hop.type}>
                    <strong>{hop.type}</strong>
                    <ul>
                      {hop.hops.map((h) => (
                        <li key={h}>
                          <a
                            href="#"
                            onClick={() => handleHopsChange(h)}
                            className={
                              selectedHops.includes(h) ? "selected" : ""
                            }>
                            {h}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown per Lieviti */}
          <div className="dropdown">
            <button
              className="btn yeast-btn"
              onClick={() => toggleDropdown("yeast")}>
              LIEVITI
            </button>
            {showYeastDropdown && (
              <div className="dropdown-content show">
                {yeastOptions.map((yeast) => (
                  <div key={yeast.type}>
                    <strong>{yeast.type}</strong>
                    <ul>
                      {yeast.yeast.map((y) => (
                        <li key={y}>
                          <a
                            href="#"
                            onClick={() => handleYeastChange(y)}
                            className={selectedYeast === y ? "selected" : ""}>
                            {y}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Immagine della pinta */}
        <img src={getBeerImage()} alt="Pinta di birra" className="beer-glass" />

        {/* Contenitore per il pulsante Generate e il messaggio di errore */}
        <div className="generate-container">
          {error && (
            <div className="alert alert-danger error-message" role="alert">
              {error}
            </div>
          )}
          <button className="btn generate-btn" onClick={handleGenerateClick}>
            Genera!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;
