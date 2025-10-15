import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import InvestorDashboard from "./pages/InvestorDashboard";
import Register from "./pages/Register";

import ProtectedRoute from "./context/ProtectedRoute";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/"element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/investor"
            element={
              <ProtectedRoute role="Investor">
                <InvestorDashboard />
              </ProtectedRoute>
            }
          />

         
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
