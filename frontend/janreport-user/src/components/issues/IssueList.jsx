import React from "react";
import issuesData from "../../assets/Data/issues";
import IssueCard from "./IssueCard";
import "../issues/IssueCard.css";

const IssueList = ({
  mode = "public",
  activeStatus = "All",
  sortBy = "latest",
  searchLocation = "",
}) => {
  let issues = [...issuesData];

  // STATUS FILTER
  if (activeStatus !== "All") {
    issues = issues.filter((i) => i.status === activeStatus);
  }

  // LOCATION SEARCH FILTER
  if (searchLocation.trim() !== "") {
    issues = issues.filter((issue) =>
      issue.location
        .toLowerCase()
        .includes(searchLocation.toLowerCase())
    );
  }

  // SORTING
  if (sortBy === "votes") {
    issues.sort((a, b) => b.votes - a.votes);
  } else {
    issues.sort(
      (a, b) =>
        new Date(b.reportedOn) - new Date(a.reportedOn)
    );
  }

  // ✅ EMPTY STATE HANDLING
  if (issues.length === 0) {
    return (
      <div className="text-center text-muted py-5">
        <i className="bi bi-geo-alt fs-1 mb-3 d-block"></i>
        <h6>No issues found</h6>
        <p className="mb-0">
          Try searching with a different location.
        </p>
      </div>
    );
  }

  return (
    <div className="row g-4">
      {issues.map((issue) => (
        <div key={issue.id} className="col-md-4">
          <IssueCard issue={issue} mode={mode} />
        </div>
      ))}
    </div>
  );
};

export default IssueList;
