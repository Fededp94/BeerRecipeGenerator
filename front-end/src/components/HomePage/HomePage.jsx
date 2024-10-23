import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../AuthContext/AuthContext.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import logo from "../../assets/Logo Definitivo.png";
import "../App/App.css";
import "../HomePage/HomePage.css";

const HomePage = () => {
  const { user, login, logout } = useAuth();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
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
      firstName: "",
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

    try {
      console.log("Invio dati di registrazione:", formData);

      const response = await axios.post(
        "http://localhost:8080/api/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );

      console.log("Risposta ricevuta:", response);

      if (response.status === 201 || response.status === 200) {
        const userData = {
          ...response.data.user,
          token: response.data.token,
        };

        login(userData);
        setIsModalVisible(false);
        alert("Registrazione completata con successo!");
      }
    } catch (error) {
      console.error("Errore dettagliato:", error);

      if (error.response) {
        console.log("Dati risposta errore:", error.response.data);
        console.log("Status errore:", error.response.status);
        alert(
          "Errore dal server: " +
            (error.response.data.message ||
              error.response.data ||
              "Errore sconosciuto")
        );
      } else if (error.request) {
        console.log("Errore richiesta:", error.request);
        alert(
          "Nessuna risposta dal server. Verifica la connessione e riprova."
        );
      } else {
        console.log("Errore configurazione:", error.message);
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
    logout();
  };

  const handleLeMieRicetteClick = () => {
    if (!user) {
      setIsModalVisible(true);
    } else {
      navigate("/LeMieRicette");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
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

        {user && (
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

        {!user && (
          <div className="start-button-container">
            <button
              className="btn btn-dark btn-lg start-button"
              onClick={handleStartClick}>
              Iniziamo!
            </button>
          </div>
        )}

        {user && (
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
                      value={formData.firstName}
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
                      value={formData.lastName}
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
