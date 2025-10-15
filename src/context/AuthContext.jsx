import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as jwtDecode from "jwt-decode"; // latest version fix
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwtDecode.default(localStorage.getItem("token"))
      : null
  );

  // Login function
  const login = async (email, password) => {
    const res = await api.post("/api/auth/login", { email, password });
    const token = res.data.token;
    localStorage.setItem("token", token);

    const decoded = jwtDecode.default(token); // decode token
    setUser(decoded);

    // Redirect based on role
    if (decoded.role === "Admin") navigate("/admin");
    else navigate("/dashboard");
  };

  // Register function
  const register = async (formData) => {
    await api.post("/api/auth/register", formData);
    navigate("/login");
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
