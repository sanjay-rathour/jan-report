import React from "react";
import Navbar from "./navbar/Navbar"; // adjust path if necessary

export default function LandingPage() {
  return (
    <div className="text-white" style={{ minHeight: "100vh" }}>

      <header id="home" className="container py-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <p className="text-uppercase text-secondary small">CIVICWATCH — your eyes on a better community</p>
            <h1 className="fw-bold display-5" style={{ color: "#1E8CD8" }}>
              Empower Your <br /> Community Today
            </h1>
            <p className="mt-3 text-light">
              Report local civic issues in your area with just a few clicks. Help us build a safer, cleaner, and better neighborhood together.
            </p>

            <div className="d-flex align-items-center mt-4 gap-3">
              <a href="#" className="btn btn-light fw-semibold d-flex align-items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                  <path d="M10 8 L16 12 L10 16 V8 Z" fill="currentColor" />
                </svg>
                Watch Video
              </a>
              <a href="#report" className="text-light text-decoration-underline small">Report an issue →</a>
            </div>

            <div className="d-flex gap-3 mt-4">
              <button className="btn btn-outline-secondary btn-sm rounded-circle px-3">←</button>
              <button className="btn btn-outline-secondary btn-sm rounded-circle px-3">→</button>
            </div>
          </div>

          <div className="col-md-6 text-center">
            <div className="rounded shadow-lg p-3" style={{ background: "linear-gradient(135deg, #0B4572, #157BC0, #1E8CD8)" }}>
              <img src="/placeholder-illustration.png" alt="illustration" className="img-fluid rounded" />
            </div>
          </div>
        </div>
      </header>
      {/* rest of page... */}
    </div>
  );
}



