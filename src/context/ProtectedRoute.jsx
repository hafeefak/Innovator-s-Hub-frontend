import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./authcontext";

export default function ProtectedRoute({ children, role }) {
  const { user, initializing } = useAuth();

  

  // Case 1: still initializing (app just started, waiting for user data)
  if (initializing) {
    console.log("⏳ ProtectedRoute: still initializing...");
    return <div>Loading...</div>;
  }

  // Case 2: no user found
  if (!user) {
    console.log("🚫 No user found, redirecting to /login");
    return <Navigate to="/login" replace />;
  }

  // Case 3: role mismatch
  if (role && user.role !== role) {
    console.log(
      `🚫 Role mismatch: required [${role}] but got [${user.role}], redirecting to /unauthorized`
    );
    return <Navigate to="/unauthorized" replace />;
  }

  // Case 4: success
  console.log(`✅ Access granted for role: ${role}`);
  return children;
}
