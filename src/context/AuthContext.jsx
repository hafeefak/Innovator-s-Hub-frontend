import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios"; // your Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // stores logged-in user info
  const [loading, setLoading] = useState(true); // prevent flicker on reload

  // Restore user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
    setLoading(false); // done loading
  }, []);

  // LOGIN
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/Auth/login", { email, password });

      if (res.data.success) {
        const loggedInUser = res.data.data; // backend should return user info including role
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));

        // Navigate based on role
        if (loggedInUser.role === "Investor") navigate("/investor");
        else if (loggedInUser.role === "Admin") navigate("/admin");
      } else {
        alert(res.data.message || "Login failed");
      }
    } catch (error) {
      console.error(error);
      alert("Login error");
    }
  };

  // REGISTER
  const register = async (name, email, password, role) => {
    try {
      const res = await api.post("/api/Auth/register", { name, email, password, role });

      if (res.data.success) {
        alert("Registration successful! Please login.");
        navigate("/login");
      } else {
        alert(res.data.message || "Registration failed");
      }
    } catch (error) {
      console.error(error);
      alert("Registration error");
    }
  };

  // LOGOUT
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use AuthContext easily
export const useAuth = () => useContext(AuthContext);
