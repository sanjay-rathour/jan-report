import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthHook } from "../context/AuthContext";

/**
 * AuthWrapper
 * - Protects routes
 * - If not authenticated, redirects to /login
 * - Saves ONLY pathname in `state.from` → safe, no absolute URLs → no cross-app redirects
 */
export default function AuthWrapper({ children }) {
  const { isAuthenticated, loading } = useAuthHook();
  const location = useLocation();

  // 1. Show loading screen while hydrating auth state
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
          <div className="spinner-border mb-3" role="status" aria-hidden="true"></div>
          <p className="mb-0">Loading...</p>
        </div>
      </div>
    );
  }

  // 2. Not authenticated → navigate to login with state.from = pathname
  if (!isAuthenticated()) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}  // VERY IMPORTANT
      />
    );
  }

  // 3. Authenticated → render the protected component
  return <>{children}</>;
}
