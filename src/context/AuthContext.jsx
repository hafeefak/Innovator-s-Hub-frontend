import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true); // ✅ used during startup

  // ✅ Load user from localStorage at app start
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("Stored user in localStorage:", storedUser);

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("✅ AuthContext initialized with user:", parsedUser);
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }

    setInitializing(false); // ✅ done loading
  }, []);

  // ✅ Login
  const login = async (email, password) => {
    try {
      const res = await api.post("/api/Auth/login", { email, password });
      if (res.data.success) {
        const loggedInUser = res.data.data;
        setUser(loggedInUser);
        localStorage.setItem("user", JSON.stringify(loggedInUser));
        return { success: true, user: loggedInUser };
      } else {
        return { success: false, message: res.data.message || "Login failed" };
      }
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  // ✅ Show loading screen while initializing
  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, initializing }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
