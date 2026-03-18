import React, { useState } from "react";
import IssueList from "../../components/issues/IssueList";

const Transparency = () => {
  const [status, setStatus] = useState("All");
  const [sortBy, setSortBy] = useState("latest");
  const [searchLocation, setSearchLocation] = useState("");

  return (
    <div className="container my-4">

      {/* HEADER */}
      <h3 className="fw-bold section-title">Community Issues</h3>
      <p className="text-muted">
        View issues reported by citizens across different localities
      </p>

      {/* FILTERS */}
      <div className="d-flex flex-wrap gap-3 mb-4 align-items-center">

        {/* STATUS FILTER */}
        {["All", "Pending", "In Progress", "Resolved"].map((s) => (
          <button
            key={s}
            className={`btn ${
              status === s
                ? "btn-primary"
                : "btn-outline-primary"
            }`}
            onClick={() => setStatus(s)}
          >
            {s}
          </button>
        ))}

        {/* SORT */}
        <select
          className="form-select w-auto"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="votes">Most Supported</option>
        </select>


        {/* 🔍 LOCATION SEARCH */}
        <input
          type="text"
          className="form-control w-auto"
          placeholder="Search by location"
          value={searchLocation}
          onChange={(e) => setSearchLocation(e.target.value)}
        />
      </div>

 {/* ISSUE LIST */}
      <IssueList
        activeStatus={status}
        sortBy={sortBy}
        searchLocation={searchLocation}
      />

    </div>
  );
};

export default Transparency;
