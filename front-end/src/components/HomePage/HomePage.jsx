import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../assets/Logo Definitivo.png";
import "../App/App.css";
import "../HomePage/HomePage.css";

const HomePage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleStartClick = () => {
    setIsModalVisible(true);
    setFormData({
      firstname: "",
      lastName: "",
      email: "",
      password: "",
    });
    setIsCheckboxChecked(false);
  };

  const handleCheckboxChange = () => setIsCheckboxChecked(!isCheckboxChecked);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isCheckboxChecked) {
      alert("Devi essere maggiorenne per registrarti!");
      return;
    }

    console.log("Dati inviati", formData);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Risposta ricevuta", response.data);

      if (response.status === 201 || response.status === 200) {
        setIsRegistered(true);
        setIsModalVisible(false);
        alert("Registrazione completata con successo!");
      } else {
        alert(
          "Errore durante la registrazione: " +
            (response.data.message || "Errore sconosciuto")
        );
      }
    } catch (error) {
      console.error("Errore durante la richiesta di registrazione:", error);

      if (error.response) {
        alert(
          "Errore dal server: " +
            (error.response.data.message ||
              error.response.data ||
              "Errore sconosciuto")
        );
      } else if (error.request) {
        alert(
          "Nessuna risposta dal server. Verifica la connessione e riprova."
        );
      } else {
        alert("Errore nella preparazione della richiesta: " + error.message);
      }
    }
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
    document.body.style.overflow = "hidden";
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
                onClick={() => setIsModalVisible(false)}
              />
              <div className="modal-header">
                <h5 className="modal-title">Devi registrarti per proseguire</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="firstName">Iniziamo dal nome</label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstName"
                      name="firstName"
                      value={formData.nome}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="lastName">Ora il cognome</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastName"
                      name="lastName"
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
