import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      // Configura axios con il token salvato
      const userData = JSON.parse(savedUser);
      if (userData?.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;
      }
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    // Imposta il token nell'header di default per axios
    if (userData?.token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    // Rimuovi il token dall'header di default per axios
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
