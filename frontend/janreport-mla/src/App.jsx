import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MlaDashboard from "./components/mla/MlaDashboard";

export default function App() {
  return (
    <Routes>
      {/* Redirect home to MLA overview */}
      <Route path="/" element={<Navigate to="/mla/overview" replace />} />

      {/* All MLA pages live under /mla/... */}
      <Route path="/mla/*" element={<MlaDashboard />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/mla/overview" replace />} />
    </Routes>
  );
}
