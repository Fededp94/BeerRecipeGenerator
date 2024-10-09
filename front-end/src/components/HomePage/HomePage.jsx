import React, { useState, useRef, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/Logo Definitivo.png";
import "../App/App.css";
import "../HomePage/HomePage.css";

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
  const navigate = useNavigate();

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

  const handleRecipesClick = () => {
    navigate("/LeMieRicette");
  };

  const handleProceedClick = () => {
    navigate("/play");
  };

  return (
    <div className="container-fluid homepage-container">
      <header className="navbar-header">
        <button
          className="btn btn-dark btn-lg navbar-button"
          onClick={handleRecipesClick} // Aggiungi il gestore per il reindirizzamento
        >
          Le mie ricette
        </button>
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
              Inziamo!
            </button>
          </div>
        )}
      </div>

      {isRegistered && (
        <button
          className="btn btn-dark proceed-button"
          onClick={handleProceedClick}>
          ORA PUOI PROCEDERE
        </button>
      )}

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
