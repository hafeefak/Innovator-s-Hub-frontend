import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/authcontext";
import ProtectedRoute from "./context/ProtectedRoute";
import Login from "./pages/Login";
import Register from "./pages/Register";
import InvestorDashboard from "./pages/InvestorDashboard";
import EntrepreneurDashboard from "./pages/EntrepreneurDashboard";

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes */}
          <Route
            path="/investor"
            element={
              <ProtectedRoute role="Investor">
                <InvestorDashboard />
              </ProtectedRoute>
            }
          />
          <Route
  path="/entrepreneur"
  element={
    <ProtectedRoute role="Entrepreneur">
      <EntrepreneurDashboard />
    </ProtectedRoute>
  }
/>

        </Routes>
      </AuthProvider>
    </Router>
  );
}
