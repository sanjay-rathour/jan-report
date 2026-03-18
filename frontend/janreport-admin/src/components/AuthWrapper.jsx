// src/components/AuthWrapper.jsx
import React from "react";
import Login from "./Login";
import { useAuthHook } from "../context/AuthContext";

const AuthWrapper = ({ children }) => {
  const { isAuthenticated, loading } = useAuthHook();

  // 1. While hydrating from localStorage, show a loading screen
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          minHeight: "100vh",
          background: "var(--color-bg-secondary)",
          color: "var(--color-text)",
        }}
      >
        <div className="text-center">
          <div
            className="spinner-border mb-3"
            role="status"
            aria-hidden="true"
          ></div>
          <p className="mb-0">Loading...</p>
        </div>
      </div>
    );
  }

  // 2. If not authenticated → show Login (which itself can link to Register)
  if (!isAuthenticated()) {
    return <Login />;
  }

  // 3. If authenticated → show actual app content
  return <>{children}</>;
};

export default AuthWrapper;
