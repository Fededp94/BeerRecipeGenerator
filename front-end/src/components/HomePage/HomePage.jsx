import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from "../../assets/Logo Definitivo.png";
import "../App/App.css";
import "../HomePage/HomePage.css";

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(
    localStorage.getItem("isRegistered") || false
  );
  const [formData, setFormData] = useState({
    nome: "",
    cognome: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  // Reset del form ogni volta che il modal si apre
  const handleStartClick = () => {
    setIsModalVisible(true); // Apre il modal
    setFormData({
      nome: "",
      cognome: "",
      email: "",
      password: "",
    });
    setIsCheckboxChecked(false); // Deseleziona la checkbox
  };

  const handleCheckboxChange = () => setIsCheckboxChecked(!isCheckboxChecked);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Imposta lo stato come registrato e salva nel localStorage (DA CAMBIARE CON BACKEND)
    setIsRegistered(true);
    localStorage.setItem("isRegistered", true);
    setIsModalVisible(false);
  };

  const handleProceedClick = () => {
    navigate("/play");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isRegistered");
    setIsRegistered(false);
  };

  const handleLeMieRicetteClick = () => {
    if (!isRegistered) {
      setIsModalVisible(true);
    } else {
      navigate("/LeMieRicette");
    }
  };

  useEffect(() => {
    // Blocco lo scroll quando sono sulla homepage
    document.body.style.overflow = "hidden";

    // Ripristino lo scroll quando esco dalla homepage
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="container-fluid homepage-container">
      <header className="navbar-header">
        <button
          className="btn btn-dark btn-lg navbar-button custom-btn"
          onClick={handleLeMieRicetteClick}>
          Le mie ricette
        </button>

        {/* Pulsante di Logout che appare solo dopo la registrazione */}
        {isRegistered && (
          <button
            className="btn btn-dark btn-lg navbar-button custom-button ml-3"
            onClick={handleLogout}>
            Logout
          </button>
        )}
      </header>

      <div className="homepage-content">
        <h1 className="main-title">BEER RECIPE GENERATOR</h1>

        <div className="logo-container">
          <img src={logo} alt="Logo del Sito" className="homepage-logo" />
        </div>

        {!isRegistered && (
          <div className="start-button-container">
            <button
              className="btn btn-dark btn-lg start-button"
              onClick={handleStartClick}>
              Iniziamo!
            </button>
          </div>
        )}

        {isRegistered && (
          <div className="button-container">
            <button
              className="btn btn-dark proceed-button"
              onClick={handleProceedClick}>
              PUOI PROCEDERE
            </button>
          </div>
        )}
      </div>

      {isModalVisible && (
        <div
          className="modal show registration-modal"
          tabIndex="-1"
          role="dialog">
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <button
                type="button"
                className="btn-close modal-close-button"
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
                      <span>Sono maggiorenne 18+</span>
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
