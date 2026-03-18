import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Users,
  ArrowLeft,
  Star,
  CheckCircle,
} from "lucide-react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import issuesData from "../../assets/Data/issues";
import "./IssueDetails.css";

/* Leaflet marker */
const viewIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const IssueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const issue = issuesData.find((i) => i.id === Number(id));

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [feedback, setFeedback] = useState("");

  if (!issue) {
    return (
      <div className="container py-5 text-center">
        <h4 className="fw-bold">Issue not found</h4>
        <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  const isResolved = issue.status === "Resolved";

  return (
    <div className="issue-details-wrapper py-5">
      <div className="container">

        {/* Back */}
        <button className="back-link mb-4" onClick={() => navigate(-1)}>
          <ArrowLeft size={18} /> Back to Dashboard
        </button>

        <div className="row g-4">

          {/* ================= COLUMN 1 : ISSUE INFO ================= */}
          <div className="col-lg-4">
            <div className="detail-card h-100">
              <div className="image-wrapper">
                <img src={issue.image} alt={issue.title} />
                <span className={`status-badge ${issue.status.toLowerCase()}`}>
                  {issue.status}
                </span>
              </div>

              <div className="p-4">
                <h5 className="fw-bold mb-2">{issue.title}</h5>
                <p className="text-muted small">
                  Verified civic issue tracked transparently through JanReport.
                </p>
 {/* FEEDBACK */}
                <div className="feedback-section mt-4 pt-3 border-top">
                  <h6 className="fw-bold mb-2">Citizen Feedback</h6>

                  {isResolved ? (
                    <>
                      <div className="star-rating mb-3">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            className={`star-btn ${
                              star <= (hover || rating) ? "active" : ""
                            }`}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                          >
                            <Star
                              size={22}
                              fill={
                                star <= (hover || rating)
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>
                        ))}
                      </div>

                      <textarea
                        className="form-control"
                        rows="3"
                        placeholder="Share your experience after resolution"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                      />

                      <button className="btn btn-primary w-100 mt-3">
                        Submit Feedback
                      </button>
                    </>
                  ) : (
                    <div className="alert alert-info small">
                      Feedback and rating will be enabled once the issue is
                      resolved.
                    </div>
                  )}
                </div>

              </div>
            </div>
          </div>

          {/* ================= COLUMN 2 : MAP ================= */}
          <div className="col-lg-4">
            <div className="detail-card h-100 p-4">
              <h6 className="fw-bold mb-3">Issue Location</h6>

              <div className="map-container">
                <MapContainer
                  center={[issue.lat, issue.lng]}
                  zoom={14}
                  scrollWheelZoom={false}
                  style={{ height: "260px", width: "100%" }}
                >
                  <TileLayer
                    attribution="&copy; OpenStreetMap contributors"
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker
                    position={[issue.lat, issue.lng]}
                    icon={viewIcon}
                  />
                </MapContainer>
              </div>

                              {/* Meta */}
                <div className="meta-block mt-3">
                  <div>
                    <MapPin size={16} /> {issue.location}
                  </div>
                  <div>
                    <Calendar size={16} /> {issue.reportedOn}
                  </div>
                  <div>
                    <Users size={16} /> {issue.votes} supporters
                  </div>
                </div>

            </div>
          </div>

          {/* ================= COLUMN 3 : TRACKING ================= */}
          <div className="col-lg-4">
            <div className="detail-card h-100 p-4">
              <h6 className="fw-bold mb-3">Tracking</h6>

              <div className="timeline">
                {issue.tracking.map((step, index) => (
                  <div
                    key={index}
                    className={`timeline-item ${
                      step.date ? "completed" : ""
                    }`}
                  >
                    <div className="timeline-icon">
                      {step.date && <CheckCircle size={16} />}
                    </div>

                    <div className="timeline-content">
                      <h6 className="mb-1">{step.step}</h6>
                      <p className="small text-muted mb-1">
                        {step.description}
                      </p>
                      <span className="date-text">
                        {step.date || "Pending"}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default IssueDetails;
