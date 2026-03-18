import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage";

// You can create these pages later as simple components
// for now, use placeholders if they don't exist yet
const PendingPage = () => (
  <div>
    <h2 className="mb-3">Pending Issues</h2>
    <p className="text-muted">
      List of issues reported by citizens that are pending verification or action.
    </p>
  </div>
);

const InProgressPage = () => (
  <div>
    <h2 className="mb-3">In-Progress Issues</h2>
    <p className="text-muted">
      Issues currently being worked on by the administration or MLA/MP office.
    </p>
  </div>
);

const ResolvedPage = () => (
  <div>
    <h2 className="mb-3">Resolved Issues</h2>
    <p className="text-muted">
      Successfully resolved civic issues for public transparency.
    </p>
  </div>
);

const Home = () => {
  return (
    <main className="app-content">
      <div className="page-inner">
        <Routes>
          {/* Main dashboard / home */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<LandingPage />} />

          {/* Status-based pages (matching your navbar links) */}
          <Route path="/pending" element={<PendingPage />} />
          <Route path="/inprogress" element={<InProgressPage />} />
          <Route path="/resolved" element={<ResolvedPage />} />
        </Routes>
      </div>
    </main>
  );
};



export default Home