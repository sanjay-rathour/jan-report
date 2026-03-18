import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";

import LandingPage from "./components/landingPage/LandingPage";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ReportIssue from "./pages/user/ReportIssue";
import UserDashboard from "./pages/dashboard/UserDashboard";
import AuthWrapper from "./pages/AuthWrapper";
import About from "./components/about/About";
import MyIssues from "./pages/user/MyIssues";
import IssueDetails from "./pages/issues/IssueDetails";
import Transparency from "./pages/public/Transparency";
import IssueChat from "./pages/chat/IssueChat";


import lightLogo from "./assets/logos/lightlogo.png";
import darkLogo from "./assets/logos/darklogo.png";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar lightLogo={lightLogo} darkLogo={darkLogo} />

      <Routes>
        {/* PUBLIC */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report-issue" element={<ReportIssue />} />
        <Route path="/issues/:id" element={<IssueDetails />} />
        <Route path="/issues/:id/chat" element={<IssueChat />} />
        <Route path="/transparency" element={<Transparency />} />

        {/* PROTECTED */}
        <Route
          path="/dashboard"
          element={
            <AuthWrapper>
              <UserDashboard />
            </AuthWrapper>
          }
        />

        <Route
          path="/my-issues"
          element={
            <AuthWrapper>
              <MyIssues />
            </AuthWrapper>
          }
        />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}
