import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuthHook } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuthHook();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !confirmPassword) {
      const msg = "Please fill in all fields";
      setError(msg);
      toast.error(msg);
      return;
    }

    if (password !== confirmPassword) {
      const msg = "Passwords do not match";
      setError(msg);
      toast.error(msg);
      return;
    }

    setLoading(true);
    try {
      const result = await register({ email, password });

      if (result.success) {
        toast.success(result.message || "Registration successful");
        navigate("/login");
      } else {
        const msg = result.message || "Registration failed";
        setError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = err.message || "Unexpected error";
      setError(msg);
      toast.error("Unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const goToLogin = () => navigate("/login");

  return (
    <div className="auth-page">
      <div
        className="card auth-card p-4 p-md-4"
        style={{
          background: "var(--color-card-bg)",
          color: "var(--color-text)",
        }}
      >
        <div className="card-body">
          {/* Header */}
          <div className="text-center mb-4">
            <h2 className="auth-title mb-1">Create your account</h2>
            <p className="auth-subtitle text-muted mb-0">
              Join JanReport to raise and track civic issues.
            </p>
          </div>

          {/* Error */}
          {error && (
            <div className="alert alert-danger py-2 small" role="alert">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate className="mt-3">
            <div className="mb-3">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control form-control-md"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control form-control-md"
                placeholder="Create a password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Confirm password</label>
              <input
                type="password"
                className="form-control form-control-md"
                placeholder="Re-enter password"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button
              className="btn btn-success w-100 btn-lg rounded-3"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center mt-3 text-muted mb-0">
            Already have an account?{" "}
            <button
              type="button"
              className="btn btn-link p-0 text-decoration-none"
              onClick={goToLogin}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
