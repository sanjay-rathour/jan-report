import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/navbar/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/footer/Footer";
import Home from "./components/Home";
import AuthWrapper from "./components/AuthWrapper";

import lightLogo from "./assets/logos/lightlogo.png";
import darkLogo from "./assets/logos/darklogo.png";

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Navbar lightLogo={lightLogo} darkLogo={darkLogo} />

      <Routes>
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />


        <Route
          path="/*"
          element={
            <AuthWrapper>
              <Home/>
            </AuthWrapper>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
