import React from "react";
import "./IssueTracking.css";

const IssueTracking = ({ tracking }) => {
  return (
    <div className="tracking-card">
      <h5 className="tracking-title">Issue Progress</h5>

      <ul className="tracking-list">
        {tracking.map((item, index) => {
          const completed = Boolean(item.date);

          return (
            <li key={index} className={`tracking-item ${completed ? "done" : "pending"}`}>
              <div className="tracking-dot" />
              <div className="tracking-content">
                <div className="tracking-step">
                  {item.step}
                </div>
                <div className="tracking-desc">
                  {item.description}
                </div>
                {item.date && (
                  <div className="tracking-date">
                    {item.date}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default IssueTracking;
