import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App/App.css";
import "../PlayPage/PlayPage.css";
import pintaImage from "../../assets/PintaVuota.png";
import pintaChiaraImage from "../../assets/Pinta.png";
import pintaAmbrataImage from "../../assets/PintaAmbrata.png";
import pintaScuraImage from "../../assets/PintaScura.png";

const PlayPage = () => {
  const navigate = useNavigate();

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
    {
      type: "Malto Chiaro",
      malts: [
        {
          name: "Malto Wheat",
          description: "Dona corpo leggero e schiuma persistente",
        },
        {
          name: "Pilsner",
          description: "Dona un colore chiaro e gusto pulito",
        },
        {
          name: "Pale Ale",
          description: "Dona un gusto maltato e bilanciato",
        },
      ],
    },
    {
      type: "Malto Ambrato",
      malts: [
        { name: "Vienna", description: "Aggiunge dolcezza e note tostate" },
        {
          name: "Monaco",
          description: "Dona colore ambrato e sapore di pane tostato",
        },
        {
          name: "Caramel",
          description: "Dona un sapore caramellato e corposo",
        },
      ],
    },
    {
      type: "Malto Scuro",
      malts: [
        {
          name: "Abbey",
          description: "Dona sapori complessi di frutta secca",
        },
        {
          name: "Carafa III",
          description: "Aggiunge note di caffè e cioccolato",
        },
        {
          name: "Chocolate",
          description: "Conferisce sapori intensi di cacao e caffè",
        },
      ],
    },
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
      hops: [
        {
          name: "Saaz",
          description: "Luppolo aromatico con note erbacee e speziate",
        },
        {
          name: "Styrian Golding",
          description: "Noto per il suo profilo floreale e dolce",
        },
        {
          name: "Hallertau Magnum",
          description: "Offre un amaro pulito e secco",
        },
      ],
    },
    {
      type: "Luppoli Agrumati",
      hops: [
        {
          name: "Citra",
          description:
            "E' famoso per il suo aroma di agrumi e frutti tropicali",
        },
        {
          name: "Hbc-630",
          description: "Ha un profilo aromatico di agrumi e frutta",
        },
        { name: "Wakatu", description: "Offre note di lime e spezie" },
      ],
    },
    {
      type: "Luppoli Fruttati",
      hops: [
        {
          name: "Wai-ti",
          description: "Ha note di frutta tropicale e fiori",
        },
        {
          name: "Mosaic",
          description: "E' noto per il suo profilo complesso di frutta e terra",
        },
        {
          name: "Vic Secret",
          description: "Offre sapori di frutta tropicale e pino",
        },
      ],
    },
  ];

  // Opzioni per i lieviti
  const yeastOptions = [
    {
      type: "Lievito Ale (Alta Fermentazione)",
      yeast: [
        {
          name: "US-05",
          description:
            "Lievito Ale americano che produce birre chiare e pulite con note fruttate",
        },
      ],
    },
    {
      type: "Lievito Lager (Bassa Fermentazione)",
      yeast: [
        {
          name: "Saflager W34/70",
          description:
            "Lievito Lager versatile che offre un profilo pulito e ben bilanciato",
        },
      ],
    },
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

  useEffect(() => {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    const tooltipList = tooltipTriggerList.map((tooltipTriggerEl) => {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });

    // Cleanup dei tooltip
    return () => {
      tooltipList.forEach((tooltip) => tooltip.dispose());
    };
  }, []);

  return (
    <div id="play-page-container" className="container-fluid p-0 play-page-bg">
      <header className="text-white py-2 d-flex justify-content-between align-items-center">
        <div className="beer-name-input">
          <input
            type="text"
            placeholder="Il nome della tua birra!"
            className={beerName ? "input-filled" : "input-empty"}
            value={beerName}
            onChange={(e) => setBeerName(e.target.value)}
          />
        </div>

        <ul className="navbar-nav d-flex flex-row ms-auto">
          {" "}
          <li className="nav-item dropdown mx-2 position-relative">
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
              <ul className="dropdown-menu show position-absolute custom-dropdown">
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
                        <li key={m.name}>
                          {" "}
                          <a
                            href="#"
                            onClick={() => handleMaltsChange(m.name)}
                            className={
                              selectedMalts.includes(m.name) ? "selected" : ""
                            }>
                            {m.name}
                            <span
                              className="info-container"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title={m.description}>
                              <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="info-icon"
                              />
                            </span>
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
                {hopsOptions.map((hopsOption) => (
                  <div key={hopsOption.type}>
                    <strong>{hopsOption.type}</strong>
                    <ul>
                      {hopsOption.hops.map((h) => (
                        <li key={h.name}>
                          <a
                            href="#"
                            onClick={() => handleHopsChange(h.name)}
                            className={
                              selectedHops.includes(h.name) ? "selected" : ""
                            }>
                            {h.name}
                            <span
                              className="info-container"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title={h.description}>
                              <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="info-icon"
                              />
                            </span>
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
                {yeastOptions.map((yeastOption) => (
                  <div key={yeastOption.type}>
                    <strong>{yeastOption.type}</strong>
                    <ul>
                      {yeastOption.yeast.map((y) => (
                        <li key={y.name}>
                          <a
                            href="#"
                            onClick={() => handleYeastChange(y.name)}
                            className={
                              selectedYeast === y.name ? "selected" : ""
                            }>
                            {y.name}
                            <span
                              className="info-container"
                              data-bs-toggle="tooltip"
                              data-bs-placement="top"
                              title={y.description} //Devo usare y per il tooltip
                            >
                              <FontAwesomeIcon
                                icon={faCircleInfo}
                                className="info-icon"
                              />
                            </span>
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
            GENERA!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayPage;
