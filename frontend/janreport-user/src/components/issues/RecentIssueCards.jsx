import React from "react";
import { Link, useNavigate } from "react-router-dom";
import issuesData from "../../assets/Data/issues";
import "./RecentIssueCards.css";

const RecentIssueCards = ({ activeStatus }) => {
  const navigate = useNavigate();

  const filteredIssues =
    activeStatus === "All"
      ? issuesData
      : issuesData.filter((issue) => issue.status === activeStatus);

  // Expert Handle: Programmatic navigation for the chat button
  const handleChatClick = (id) => {
    navigate(`/chat/${id}`);
  };

  return (
    <div className="row g-4">
      {filteredIssues.map((issue) => (
        <div key={issue.id} className="col-md-4">
          <div className="dashboard-issue-card">
            <div className="dashboard-issue-image">
              <img src={issue.image} alt={issue.title} />
              <span className={`dashboard-status status-${issue.statusKey}`}>
                {issue.status}
              </span>
            </div>

            <div className="dashboard-issue-body">
              <h5 className="dashboard-issue-title">{issue.title}</h5>

              <div className="dashboard-issue-meta">
                <span>📍 {issue.location}</span>
                <span>📅 {issue.reportedOn}</span>
                <span>👍 {issue.votes} supporters</span>
              </div>

              <div className="dashboard-spacer" />

              <div className="dashboard-actions">
                {/* MATCHES: <Route path="/issues/:id" ... /> */}
                <Link to={`/issues/${issue.id}`} className="btn-view">
                  View Details
                </Link>
                
                {/* MATCHES: <Route path="/chat/:issueId" ... /> */}
                <Link to={`/issues/${issue.id}/chat`} className="btn-chat">
  Chat
</Link>

              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecentIssueCards;