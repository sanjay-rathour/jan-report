import React, { useState } from "react";
import { Link } from "react-router-dom";
import RecentIssueCards from "../../components/issues/RecentIssueCards";
import "./UserDashboard.css";

const UserDashboard = () => {
  const [activeStatus, setActiveStatus] = useState("All");

  const summaryCards = [
    { label: "Total Issues", value: 12, status: "All", color: "primary" },
    { label: "Pending", value: 5, status: "Pending", color: "warning" },
    { label: "In Progress", value: 4, status: "In Progress", color: "info" },
    { label: "Resolved", value: 3, status: "Resolved", color: "success" },
  ];

  return (
    <div className="container my-4">

      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="fw-bold mb-1">Welcome, Citizen 👋</h3>
          <p className="text-muted mb-0">
            Track and manage the issues you have reported
          </p>
        </div>

        <Link to="/report-issue" className="btn btn-primary">
          + Report New Issue
        </Link>
      </div>

      {/* Summary Cards (Single Filter Source) */}
      <div className="row g-3 mb-4">
        {summaryCards.map((card) => (
          <div key={card.status} className="col-md-3">
            <div
              className={`card summary-card border-0 shadow-sm ${
                activeStatus === card.status ? "active" : ""
              }`}
              onClick={() => setActiveStatus(card.status)}
            >
              <div className="card-body text-center">
                <h6 className="text-muted">{card.label}</h6>
                <h2 className={`fw-bold text-${card.color}`}>
                  {card.value}
                </h2>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Issues */}
      <RecentIssueCards activeStatus={activeStatus} />

    </div>
  );
};

export default UserDashboard;

