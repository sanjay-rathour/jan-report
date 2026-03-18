import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="jr-footer mt-auto py-4">
      <div className="container text-center">

        {/* Logo + Brand Name */}
        <h5 className="fw-bold mb-2" style={{ color: "var(--color-text)" }}>
          JanReport
        </h5>
        <p className="small mb-3" style={{ color: "var(--color-text-muted)" }}>
          A Citizen–to–MLA/MP Issue Reporting Platform
        </p>

        {/* Footer Links */}
        <div className="footer-links mb-3">
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </div>

        {/* Divider */}
        <hr className="footer-divider" />

        {/* Copyright */}
        <p className="small mb-0" style={{ color: "var(--color-text-muted)" }}>
          © {new Date().getFullYear()} JanReport. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
