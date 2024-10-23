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
  const [isRegisterModalVisible, setIsRegisterModalVisible] = useState(false);
  const [isLoginModalVisible, setIsLoginModalVisible] = useState(false);
  const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleStartClick = () => {
    setIsRegisterModalVisible(true);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setIsCheckboxChecked(false);
  };

  const handleSignupClick = () => {
    handleStartClick();
  };

  const handleLoginClick = () => {
    setIsLoginModalVisible(true);
    setLoginData({
      email: "",
      password: "",
    });
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
        setIsRegisterModalVisible(false);
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginUserData = {
        firstName: "",
        lastName: "",
        email: loginData.email,
        password: loginData.password,
      };

      const response = await axios.post(
        "http://localhost:8080/api/login",
        loginUserData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: false,
        }
      );

      if (response.status === 200) {
        const userData = {
          ...response.data.user,
          token: response.data.token,
        };
        login(userData);
        setIsLoginModalVisible(false);
        alert("Login effettuato con successo!");
      }
    } catch (error) {
      console.error("Errore durante il login:", error);
      alert(
        error.response?.data ||
          "Errore durante il login. Verifica le tue credenziali."
      );
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
    navigate("/LeMieRicette");
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
        <div className="nav-buttons">
          {!user ? (
            <>
              <button className="btn navbar-button" onClick={handleLoginClick}>
                Login
              </button>
              <button className="btn navbar-button" onClick={handleSignupClick}>
                Signup
              </button>
            </>
          ) : (
            <>
              <button
                className="btn navbar-button"
                onClick={handleLeMieRicetteClick}>
                Le mie ricette
              </button>
              <button className="btn navbar-button" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </header>

      <main className="homepage-content">
        <h1 className="main-title">BEER RECIPE GENERATOR</h1>

        <div className="logo-container">
          <img src={logo} alt="Logo del Sito" className="homepage-logo" />
        </div>

        {!user && (
          <div className="start-button-container">
            <button className="btn start-button" onClick={handleStartClick}>
              Iniziamo!
            </button>
          </div>
        )}

        {user && (
          <div className="proceed-button-container">
            <button className="btn proceed-button" onClick={handleProceedClick}>
              PUOI PROCEDERE
            </button>
          </div>
        )}
      </main>

      {/* Modale di Login */}
      {isLoginModalVisible && (
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
                onClick={() => setIsLoginModalVisible(false)}
              />
              <div className="modal-header">
                <h5 className="modal-title">Accedi al tuo account</h5>
              </div>
              <div className="modal-body">
                <form onSubmit={handleLoginSubmit}>
                  <div className="form-group">
                    <label htmlFor="loginEmail">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="loginEmail"
                      name="email"
                      value={loginData.email}
                      onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      id="loginPassword"
                      name="password"
                      value={loginData.password}
                      onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success mt-3">
                    Accedi
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modale di Registrazione */}
      {isRegisterModalVisible && (
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
                onClick={() => setIsRegisterModalVisible(false)}
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
