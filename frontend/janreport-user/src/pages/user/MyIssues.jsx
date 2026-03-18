import React from "react";
import issues from "../../assets/Data/issues";
import IssueCard from "../../components/issues/IssueCard";

const MyIssues = () => {
  return (
    <div className="container my-4">
      <h4 className="fw-bold mb-4">My Reported Issues</h4>

      <div className="row g-4">
        {issues.map((issue) => (
          <div key={issue.id} className="col-md-4">
            <IssueCard issue={issue} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyIssues;
