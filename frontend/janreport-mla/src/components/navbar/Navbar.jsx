import React, { useEffect, useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiMenu } from "react-icons/fi";
import { useAuthHook } from "../../context/AuthContext"; 
import "./Navbar.css";


const Navbar = ({ lightLogo, darkLogo }) => {
  const [dark, setDark] = useState(() => {
    try {
      return localStorage.getItem("dark") === "true";
    } catch {
      return false;
    }
  });

  const { isAuthenticated, logout, user } = useAuthHook();
  const navigate = useNavigate();
  const authed = isAuthenticated();

  useEffect(() => {
    try {
      if (dark) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      localStorage.setItem("dark", dark ? "true" : "false");
    } catch (e) {
      console.warn("Theme persistence failed", e);
    }
  }, [dark]);

  const handleToggleTheme = () => setDark((prev) => !prev);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleReportIssueClick = () => {
    if (authed) {
      navigate("/report-issue");
    } else {
      navigate("/login");
    }
  };

  const handleClick =() => {
    navigate("/MlaDashboard");
  }

  return (
    <nav className="navbar navbar-expand-lg sticky-top">
      <div className="container-fluid px-3">
        <Link className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={dark ? darkLogo : lightLogo}
            className="nav-logo"
            alt="JanReport"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarItems"
          aria-controls="navbarItems"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <FiMenu size={22} />
        </button>

        <div className="collapse navbar-collapse" id="navbarItems">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <button
                type="button"
                className="nav-link btn btn-link"
                onClick={handleReportIssueClick}
              >
                Report Issue
              </button>
            </li>

            {authed && (
              <>
                <li className="nav-item dropdown">
                  <button
                    className="nav-link dropdown-toggle btn btn-link"
                    id="issuesDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    My Issues
                  </button>
                  <ul
                    className="dropdown-menu"
                    aria-labelledby="issuesDropdown"
                  >
                    <li>
                      <NavLink className="dropdown-item" to="/pending">
                        Pending
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/inprogress">
                        In Progress
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/resolved">
                        Resolved
                      </NavLink>
                    </li>
                  </ul>
                </li>

                <li className="nav-item">
                  <NavLink className="nav-link" to="/profile">
                    Profile
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          <div className="d-flex align-items-center gap-2">
            <button
              type="button"
              className="btn-ghost"
              onClick={handleToggleTheme}
              aria-pressed={dark}
              aria-label="Toggle Dark Mode"
              title={dark ? "Switch to light mode" : "Switch to dark mode"}
            >
              {dark ? <FiSun size={20} /> : <FiMoon size={20} />}
            </button>

       
            {authed ? (
              <>
                {user && (
                  <span className="small text-muted d-none d-md-inline">
                    {user.email}
                  </span>
                )}
                <button
                  type="button"
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="btn btn-primary btn-sm">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

