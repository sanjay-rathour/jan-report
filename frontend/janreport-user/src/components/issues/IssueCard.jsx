import React from "react";
import { Link } from "react-router-dom";
import {
  FaHourglassHalf,
  FaSyncAlt,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaThumbsUp,
} from "react-icons/fa";
import "./IssueCard.css";

const IssueCard = ({ issue }) => {

  /* STATUS → COLOR CLASS */
  const statusMap = {
    Pending: "warning",
    "In Progress": "info",
    Resolved: "success",
  };

  /* STATUS → ICON */
  const statusIconMap = {
    Pending: <FaHourglassHalf />,
    "In Progress": <FaSyncAlt />,
    Resolved: <FaCheckCircle />,
  };

  return (
    <article className="issue-card">

      {/* IMAGE */}
      <div className="issue-image-wrapper">
        <img
          src={issue.image}
          alt={issue.title}
          className="issue-image"
        />
      </div>

      {/* BODY */}
      <div className="card-body">

        {/* TITLE + STATUS */}
        <div className="d-flex justify-content-between align-items-start mb-2">
          <h6 className="fw-bold mb-0">{issue.title}</h6>

          <span className={`badge bg-${statusMap[issue.status]}`}>
            <span className="badge-icon">
              {statusIconMap[issue.status]}
            </span>
            {issue.status}
          </span>
        </div>

        {/* LOCATION */}
        <p className="text-muted small mb-1">
          <FaMapMarkerAlt className="location-icon me-1" />
          {issue.location}
        </p>

        {/* DATE */}
        <p className="text-muted small mb-1">
          Reported on {issue.reportedOn}
        </p>

        {/* SUPPORT */}
        <p className="text-muted small mb-3">
          <FaThumbsUp className="me-1 text-warning" />
          {issue.votes} supporters
        </p>

        {/* ACTION */}
        <Link
          to={`/issues/${issue.id}`}
          className="btn btn-outline-primary btn-sm"
        >
          View Details
        </Link>

      </div>
    </article>
  );
};

export default IssueCard;
