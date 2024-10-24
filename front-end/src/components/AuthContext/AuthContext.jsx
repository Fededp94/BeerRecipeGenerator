import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);

      if (userData?.token) {
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${userData.token}`;
      }
    }
  }, []);

  const login = (responseData) => {
    const userData = {
      email: responseData.email,
      token: responseData.token,
    };

    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    if (userData.token) {
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${userData.token}`;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
