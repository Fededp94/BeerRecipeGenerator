import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

import logo from "../../assets/Logo Definitivo.png";
import "../css/App.css";
import "../css/HomePage.css";

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });
  const [logoOpacity, setLogoOpacity] = useState(0);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoOpacity(1);
    }, 150);
    return () => clearTimeout(timer);
  }, []);

  const handleStartClick = () => setIsModalVisible(true);
  const handleCheckboxChange = () => setIsCheckboxChecked(!isCheckboxChecked);
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsModalVisible(false);
    setIsRegistered(true);
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [eventiOpen, setEventiOpen] = useState(false);
  const toggleEventi = () => setEventiOpen(!eventiOpen);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setEventiOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleProceedClick = () => {
    navigate("/play"); // reindirizzazione pagina PlayPage
  };

  return (
    <div className="container-fluid p-0" style={{ backgroundColor: "#f0f0f0" }}>
      {/* Barra nera con menu */}
      <header className="bg-dark text-white py-2">
        <nav className="container d-flex justify-content-end">
          <ul
            className="navbar-nav d-flex flex-row"
            ref={dropdownRef}
            style={{ position: "relative" }}>
            <li className="nav-item dropdown mx-2">
              <a
                className="nav-link dropdown-toggle text-white"
                href="#"
                id="eventsDropdown"
                role="button"
                aria-expanded={eventiOpen}
                onClick={toggleEventi}>
                Eventi futuri
              </a>
              {eventiOpen && (
                <ul
                  className="dropdown-menu show"
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    zIndex: 1000,
                    backgroundColor: "#fff",
                    border: "1px solid rgba(0, 0, 0, 0.15)",
                    width: "auto",
                  }}>
                  {[...Array(20)].map((_, index) => (
                    <li key={index}>
                      <a className="dropdown-item" href="#">
                        Evento {index + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          </ul>
        </nav>
      </header>

      {/* Contenuto della Homepage */}
      <div
        className="d-flex flex-column justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "url('')",
          backgroundSize: "cover",
        }}>
        <h1
          className="text-black mb-1"
          /* style={{ fontFamily: "Teko", fontSize: "6rem" }} */
        >
          BEER RECIPE GENERATOR
        </h1>

        <img
          src={logo}
          alt="Logo del Sito"
          className="mb-1"
          style={{
            width: "900px",
            height: "auto",
            opacity: logoOpacity,
            transition: "opacity 1s ease-in-out",
          }}
        />

        {!isRegistered && (
          <div className="d-flex justify-content-center mt-0">
            <button
              className="btn btn-dark btn-lg"
              onClick={handleStartClick}
              style={{ fontSize: "2rem", margin: "5vh" }}>
              INIZIAMO!!
            </button>
          </div>
        )}
      </div>

      {isRegistered && (
        <button
          className="btn btn-dark position-fixed"
          style={{
            bottom: "60px",
            right: "20px",
            fontSize: "2rem",
            color: "white",
            backgroundColor: "#333333",
          }}
          onClick={handleProceedClick}>
          ORA PUOI PROCEDERE
        </button>
      )}

      {isModalVisible && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          role="dialog"
          style={{
            backdropFilter: "blur(5px)",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}>
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content position-relative">
              <button
                type="button"
                className="btn-close position-absolute top-0 end-0 m-2"
                aria-label="Close"
                onClick={() => setIsModalVisible(false)}></button>
              <div className="modal-header">
                <h5 className="modal-title">Devi registrarti per proseguire</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="nome">Iniziamo dal nome</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nome"
                      name="nome"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="cognome">Ora il cognome</label>
                    <input
                      type="text"
                      className="form-control"
                      id="cognome"
                      name="cognome"
                      value={formData.cognome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">
                      Ci siamo quasi, inserisci l'email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">
                      Manca solo la password e ci siamo!
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="ageCheck"
                      checked={isCheckboxChecked}
                      onChange={handleCheckboxChange}
                    />
                    <label className="form-check-label" htmlFor="ageCheck">
                      Sono maggiorenne 18+
                    </label>
                  </div>
                  {isCheckboxChecked && (
                    <button type="submit" className="btn btn-success mt-3">
                      HAI IL PERMESSO DI ENTRARE!
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
