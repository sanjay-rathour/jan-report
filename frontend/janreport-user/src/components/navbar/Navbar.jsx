import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAuthHook } from "../../context/AuthContext";
import "./Navbar.css";

const Navbar = ({ lightLogo, darkLogo }) => {
  const [dark, setDark] = useState(localStorage.getItem("dark") === "true");
  const { isAuthenticated, logout } = useAuthHook();
  const navigate = useNavigate();
  const authed = isAuthenticated();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("dark", dark);
  }, [dark]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-top navbar-theme">
      <div className="container-fluid px-3">

        {/* LOGO */}
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={dark ? darkLogo : lightLogo}
            className="nav-logo"
            alt="JanReport"
          />
        </Link>

        {/* TOGGLER */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarItems"
          aria-controls="navbarItems"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <i className="bi bi-list"></i>
        </button>

        <div className="collapse navbar-collapse" id="navbarItems">
          <ul className="navbar-nav me-auto">

            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                <i className="bi bi-house me-1"></i> Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                <i className="bi bi-info-circle me-1"></i> About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink className="nav-link" to="/report-issue">
                <i className="bi bi-exclamation-triangle me-1"></i> Report Issue
              </NavLink>
            </li>

            {/* ✅ NEW: TRANSPARENCY & TRACKING */}
            <li className="nav-item">
              <NavLink className="nav-link" to="/transparency">
                <i className="bi bi-eye me-1"></i> Transparency
              </NavLink>
            </li>

          </ul>

          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center gap-2">

            {/* THEME TOGGLE */}
            <button
              className="btn-ghost"
              onClick={() => setDark(!dark)}
              aria-label="Toggle Dark/Light Mode"
            >
              <i className={`bi fs-5 ${dark ? "bi-sun" : "bi-moon"}`}></i>
            </button>

            {/* AUTH */}
            {authed ? (
              <>
                <button
                  className="btn btn-outline-primary btn-sm"
                  onClick={() => navigate("/dashboard")}
                >
                  <i className="bi bi-person-circle me-1"></i> Profile
                </button>

                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right"></i> Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                <i className="bi bi-box-arrow-in-right me-1"></i> Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
