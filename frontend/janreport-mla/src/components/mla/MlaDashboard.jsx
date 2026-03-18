import React, { useState } from "react";
import {
  NavLink,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";

/* =========================
   SHARED UI SECTIONS
========================= */

// Reusable summary card
const SummaryCard = ({ title, value, subtext, highlightClass = "" }) => (
  <div className="col-sm-6 col-lg-3 mb-3">
    <div className={`card border-0 shadow-sm h-100 ${highlightClass}`}>
      <div className="card-body">
        <div className="small text-muted text-uppercase mb-1">{title}</div>
        <h4 className="fw-semibold mb-1">{value}</h4>
        {subtext && <div className="small text-muted">{subtext}</div>}
      </div>
    </div>
  </div>
);

// Summary cards with professional terminology
const SummarySection = ({ stats, resolutionRate }) => (
  <section className="mb-4">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h6 className="fw-semibold mb-0">Summary (Constituency Only)</h6>
      <div className="small text-muted">
        Overall Resolution Rate:{" "}
        <span className="fw-semibold text-success">
          {resolutionRate}% ({stats.resolved} of {stats.totalIssues})
        </span>
      </div>
    </div>
    <div className="row">
      <SummaryCard
        title="Total Issues"
        value={stats.totalIssues}
        subtext="All issues from this constituency"
        highlightClass="border-start border-4 border-secondary"
      />
      <SummaryCard
        title="Pending for Assignment"
        value={stats.pendingForAssignment}
        subtext="Verified issues awaiting department allocation"
        highlightClass="border-start border-4 border-danger"
      />
      <SummaryCard
        title="In Progress"
        value={stats.inProgress}
        subtext="Issues currently under resolution"
        highlightClass="border-start border-4 border-warning"
      />
      <SummaryCard
        title="Resolved"
        value={stats.resolved}
        subtext="Issues successfully closed with citizen feedback"
        highlightClass="border-start border-4 border-success"
      />
    </div>
  </section>
);

// Donut + category bar chart
const AnalyticsSection = ({ stats, categoryData }) => {
  const statusData = [
    {
      name: "Pending for Assignment",
      value: stats.pendingForAssignment,
      color: "#dc3545",
    },
    {
      name: "In Progress",
      value: stats.inProgress,
      color: "#ffc107",
    },
    {
      name: "Resolved",
      value: stats.resolved,
      color: "#198754",
    },
  ];

  return (
    <section className="mb-4">
      <div className="row">
        {/* Status Donut */}
        <div className="col-lg-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-semibold">Issue Status Distribution</h6>
              <span className="small text-muted">Current snapshot</span>
            </div>
            <div className="card-body d-flex flex-column align-items-center justify-content-center">
              <div style={{ width: "100%", height: 260 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-2 w-100">
                {statusData.map((item) => (
                  <div
                    key={item.name}
                    className="d-flex align-items-center justify-content-between small mb-1"
                  >
                    <div>
                      <span
                        style={{
                          display: "inline-block",
                          width: 10,
                          height: 10,
                          borderRadius: "50%",
                          backgroundColor: item.color,
                          marginRight: 6,
                        }}
                      ></span>
                      {item.name}
                    </div>
                    <strong>{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Issues by Category */}
        <div className="col-lg-6 mb-3">
          <div className="card border-0 shadow-sm h-100">
            <div className="card-header bg-transparent border-0 d-flex justify-content-between align-items-center">
              <h6 className="mb-0 fw-semibold">Issues by Category</h6>
              <span className="small text-muted">Higher bar = more issues</span>
            </div>
            <div className="card-body" style={{ height: 260 }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={categoryData}
                  margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="total"
                    name="Total Issues"
                    fill="#0d6efd"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/* =========================
   STATUS FILTER + DELAY ALERT
========================= */

const STATUS_LABELS = {
  ALL: "All",
  PENDING: "Pending",
  IN_PROGRESS: "In Progress",
  RESOLVED: "Resolved",
};

const StatusFilterBar = ({ statusFilter, onChange, delayedCount }) => {
  const buttons = [
    { key: "ALL", label: "All" },
    { key: "PENDING", label: "Pending" },
    { key: "IN_PROGRESS", label: "In Progress" },
    { key: "RESOLVED", label: "Resolved" },
  ];

  return (
    <div className="d-flex flex-wrap justify-content-between align-items-center mb-2">
      <div className="btn-group btn-group-sm mb-2">
        {buttons.map((btn) => (
          <button
            key={btn.key}
            type="button"
            className={
              "btn " +
              (statusFilter === btn.key ? "btn-primary" : "btn-outline-primary")
            }
            onClick={() => onChange(btn.key)}
          >
            {btn.label}
          </button>
        ))}
      </div>
      <div className="small text-muted mb-2">
        Delayed Open Issues (&gt; 7 days):{" "}
        <span
          className={
            "fw-semibold " +
            (delayedCount > 0 ? "text-danger" : "text-success")
          }
        >
          {delayedCount}
        </span>
      </div>
    </div>
  );
};

const IssuesByStatusSection = ({ issues, statusFilter }) => {
  const filteredIssues =
    statusFilter === "ALL"
      ? issues
      : issues.filter((issue) => issue.status === statusFilter);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "PENDING":
        return "badge bg-danger-subtle text-danger border border-danger-subtle";
      case "IN_PROGRESS":
        return "badge bg-warning-subtle text-warning border border-warning-subtle";
      case "RESOLVED":
        return "badge bg-success-subtle text-success border border-success-subtle";
      default:
        return "badge bg-secondary-subtle text-secondary border border-secondary-subtle";
    }
  };

  const getStatusLabel = (status) => STATUS_LABELS[status] || status;

  const isDelayed = (issue) =>
    issue.status !== "RESOLVED" && issue.daysOpen > 7;

  return (
    <section className="mb-4">
      <h6 className="fw-semibold mb-2">Status-wise Issues Overview</h6>
      <p className="small text-muted mb-2">
        Quick view of issues across statuses with delay alerts for items open
        longer than 7 days.
      </p>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Issue ID</th>
                <th>Category</th>
                <th>Area / Village</th>
                <th>Status</th>
                <th>Days Open</th>
                <th>Alert</th>
              </tr>
            </thead>
            <tbody>
              {filteredIssues.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center small text-muted py-3"
                  >
                    No issues for the selected status.
                  </td>
                </tr>
              )}

              {filteredIssues.map((issue) => (
                <tr key={issue.id}>
                  <td className="fw-semibold">{issue.id}</td>
                  <td>{issue.category}</td>
                  <td>{issue.area}</td>
                  <td>
                    <span className={getStatusBadgeClass(issue.status)}>
                      {getStatusLabel(issue.status)}
                    </span>
                  </td>
                  <td>{issue.daysOpen}</td>
                  <td>
                    {issue.status === "RESOLVED" ? (
                      <span className="badge bg-success-subtle text-success border border-success-subtle">
                        Resolved
                      </span>
                    ) : isDelayed(issue) ? (
                      <span className="badge bg-danger-subtle text-danger border border-danger-subtle">
                        Delayed (&gt; 7 days)
                      </span>
                    ) : (
                      <span className="small text-muted">On track</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

/* =========================
   OTHER PAGES
========================= */

const VerifiedIssuesSection = ({ issues, onAssign }) => {
  const [assignState, setAssignState] = useState({});

  const handleChange = (id, field, value) => {
    setAssignState((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value,
      },
    }));
  };

  const handleAssignClick = (issue) => {
    const state = assignState[issue.id] || {};
    onAssign(issue, state.department || "", state.officer || "");
  };

  return (
    <section className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-semibold mb-0">
          Verified Issues (Pending for Assignment)
        </h6>
        <span className="small text-muted">
          Admin-verified issues awaiting department/officer allocation.
        </span>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Issue ID</th>
                <th>Category</th>
                <th>Area / Village</th>
                <th>Reported By</th>
                <th>Verified On</th>
                <th>Department</th>
                <th>Officer</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {issues.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center small text-muted py-3">
                    No verified issues pending for assignment.
                  </td>
                </tr>
              )}

              {issues.map((issue) => (
                <tr key={issue.id}>
                  <td className="fw-semibold">{issue.id}</td>
                  <td>{issue.category}</td>
                  <td>{issue.area}</td>
                  <td>{issue.citizenName}</td>
                  <td>{issue.verifiedOn}</td>
                  <td style={{ minWidth: 140 }}>
                    <select
                      className="form-select form-select-sm"
                      value={assignState[issue.id]?.department || ""}
                      onChange={(e) =>
                        handleChange(issue.id, "department", e.target.value)
                      }
                    >
                      <option value="">Select department</option>
                      <option value="Roads & Buildings">
                        Roads &amp; Buildings
                      </option>
                      <option value="Water Supply">Water Supply</option>
                      <option value="Sanitation">Sanitation</option>
                      <option value="Electricity">Electricity</option>
                      <option value="Other">Other</option>
                    </select>
                  </td>
                  <td style={{ minWidth: 140 }}>
                    <input
                      type="text"
                      className="form-control form-control-sm"
                      placeholder="Officer name"
                      value={assignState[issue.id]?.officer || ""}
                      onChange={(e) =>
                        handleChange(issue.id, "officer", e.target.value)
                      }
                    />
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleAssignClick(issue)}
                    >
                      Assign
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

const AssignedIssuesSection = ({ assignedIssues }) => (
  <section className="mb-4">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h6 className="fw-semibold mb-0">Assigned Issues</h6>
      <span className="small text-muted">
        Track progress of issues currently under resolution.
      </span>
    </div>

    <div className="card border-0 shadow-sm">
      <div className="table-responsive">
        <table className="table table-striped mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Issue ID</th>
              <th>Category</th>
              <th>Area / Village</th>
              <th>Department</th>
              <th>Officer</th>
              <th>Progress</th>
              <th>Days Open</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {assignedIssues.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center small text-muted py-3">
                  No assigned issues.
                </td>
              </tr>
            )}

            {assignedIssues.map((issue) => (
              <tr key={issue.id}>
                <td className="fw-semibold">{issue.id}</td>
                <td>{issue.category}</td>
                <td>{issue.area}</td>
                <td>{issue.department}</td>
                <td>{issue.officer}</td>
                <td style={{ minWidth: 150 }}>
                  <div className="progress" style={{ height: 6 }}>
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: `${issue.progress}%` }}
                      aria-valuenow={issue.progress}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>
                  <div className="small text-muted mt-1">
                    {issue.progress}% complete
                  </div>
                </td>
                <td>{issue.daysOpen}</td>
                <td>
                  <span className="badge bg-info text-dark">In Progress</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const ResolvedIssuesSection = ({ resolvedIssues }) => (
  <section className="mb-4">
    <div className="d-flex justify-content-between align-items-center mb-2">
      <h6 className="fw-semibold mb-0">Resolved Issues</h6>
      <span className="small text-muted">
        Completed issues along with citizen feedback.
      </span>
    </div>

    <div className="card border-0 shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover mb-0 align-middle">
          <thead className="table-light">
            <tr>
              <th>Issue ID</th>
              <th>Category</th>
              <th>Area / Village</th>
              <th>Resolved On</th>
              <th>Citizen</th>
              <th>Rating</th>
              <th>Feedback</th>
              <th>Days Open</th>
            </tr>
          </thead>
          <tbody>
            {resolvedIssues.length === 0 && (
              <tr>
                <td colSpan="8" className="text-center small text-muted py-3">
                  No resolved issues.
                </td>
              </tr>
            )}

            {resolvedIssues.map((issue) => (
              <tr key={issue.id}>
                <td className="fw-semibold">{issue.id}</td>
                <td>{issue.category}</td>
                <td>{issue.area}</td>
                <td>{issue.resolvedOn}</td>
                <td>{issue.citizenName}</td>
                <td>
                  {"★".repeat(issue.rating)}
                  {"☆".repeat(5 - issue.rating)}
                </td>
                <td className="small">{issue.feedback}</td>
                <td>{issue.daysOpen}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
);

const ReportsSection = ({ reports }) => {
  const [filters, setFilters] = useState({
    village: "",
    category: "",
    month: "",
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <section className="mb-4">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="fw-semibold mb-0">
          Reports (By Village / Category / Month)
        </h6>
        <span className="small text-muted">
          Analytical view of issue distribution.
        </span>
      </div>

      <div className="card border-0 shadow-sm mb-3">
        <div className="card-body">
          <div className="row g-2">
            <div className="col-sm-4">
              <label className="small text-muted mb-1">Village</label>
              <input
                type="text"
                className="form-control form-control-sm"
                placeholder="e.g. Gandhi Nagar"
                value={filters.village}
                onChange={(e) => handleChange("village", e.target.value)}
              />
            </div>
            <div className="col-sm-4">
              <label className="small text-muted mb-1">Category</label>
              <select
                className="form-select form-select-sm"
                value={filters.category}
                onChange={(e) => handleChange("category", e.target.value)}
              >
                <option value="">All categories</option>
                <option value="Roads">Roads</option>
                <option value="Water">Water</option>
                <option value="Sanitation">Sanitation</option>
                <option value="Electricity">Electricity</option>
              </select>
            </div>
            <div className="col-sm-4">
              <label className="small text-muted mb-1">Month</label>
              <select
                className="form-select form-select-sm"
                value={filters.month}
                onChange={(e) => handleChange("month", e.target.value)}
              >
                <option value="">All months</option>
                <option value="2025-01">Jan 2025</option>
                <option value="2025-02">Feb 2025</option>
                <option value="2025-03">Mar 2025</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0 shadow-sm">
        <div className="table-responsive">
          <table className="table table-sm mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>Village</th>
                <th>Category</th>
                <th>Month</th>
                <th>Total Issues</th>
                <th>Resolved</th>
                <th>Pending</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r, idx) => (
                <tr key={idx}>
                  <td>{r.village}</td>
                  <td>{r.category}</td>
                  <td>{r.month}</td>
                  <td>{r.total}</td>
                  <td>{r.resolved}</td>
                  <td>{r.pending}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

/* =========================
   MAIN LAYOUT + ROUTES
========================= */

const MlaDashboard = () => {
  // Dummy data – later replace with backend data
  const stats = {
    totalIssues: 120,
    pendingForAssignment: 18,
    inProgress: 45,
    resolved: 57,
  };

  const verifiedIssues = [
    {
      id: "JR-1101",
      category: "Road Damage",
      area: "Ward 12 - Market Street",
      citizenName: "Ravi Kumar",
      verifiedOn: "10 Dec 2025",
      daysOpen: 5,
    },
    {
      id: "JR-1094",
      category: "Water Stagnation",
      area: "Ward 07 - Gandhi Nagar",
      citizenName: "Suma R",
      verifiedOn: "09 Dec 2025",
      daysOpen: 9,
    },
  ];

  const assignedIssues = [
    {
      id: "JR-1040",
      category: "Street Light",
      area: "Ward 03 - Old Town",
      department: "Electricity",
      officer: "Srinivas (AE)",
      progress: 60,
      daysOpen: 8,
      status: "IN_PROGRESS",
    },
    {
      id: "JR-1033",
      category: "Garbage Overflow",
      area: "Ward 09 - Ram Nagar",
      department: "Sanitation",
      officer: "Mahesh (Sanitary Inspector)",
      progress: 35,
      daysOpen: 12,
      status: "IN_PROGRESS",
    },
  ];

  const resolvedIssues = [
    {
      id: "JR-1001",
      category: "Potholes",
      area: "Ward 01 - Old Bus Stand",
      resolvedOn: "01 Dec 2025",
      citizenName: "Lakshmi",
      rating: 4,
      feedback: "Work completed within a week. Road is much better now.",
      daysOpen: 6,
      status: "RESOLVED",
    },
    {
      id: "JR-1005",
      category: "Water Leakage",
      area: "Ward 05 - Colony Road",
      resolvedOn: "28 Nov 2025",
      citizenName: "Imran",
      rating: 5,
      feedback: "Very quick response. Thank you.",
      daysOpen: 4,
      status: "RESOLVED",
    },
  ];

  const reports = [
    {
      village: "Gandhi Nagar",
      category: "Roads",
      month: "Nov 2025",
      total: 12,
      resolved: 9,
      pending: 3,
    },
    {
      village: "Old Town",
      category: "Electricity",
      month: "Nov 2025",
      total: 7,
      resolved: 6,
      pending: 1,
    },
  ];

  const issuesByCategoryData = [
    { category: "Roads", total: 32 },
    { category: "Water", total: 21 },
    { category: "Sanitation", total: 18 },
    { category: "Electricity", total: 14 },
    { category: "Other", total: 7 },
  ];

  // ====== Derived analytics ======
  const resolutionRate =
    stats.totalIssues > 0
      ? Math.round((stats.resolved / stats.totalIssues) * 100)
      : 0;

  // Combine all issues with normalized status for filter view
  const allIssuesForFilter = [
    ...verifiedIssues.map((i) => ({ ...i, status: "PENDING" })),
    ...assignedIssues, // already IN_PROGRESS
    ...resolvedIssues, // already RESOLVED
  ];

  const delayedOpenIssuesCount = allIssuesForFilter.filter(
    (issue) => issue.status !== "RESOLVED" && issue.daysOpen > 7
  ).length;

  const [statusFilter, setStatusFilter] = useState("ALL");

  const handleAssign = (issue, department, officer) => {
    if (!department || !officer) {
      alert("Please select department and enter officer name before assigning.");
      return;
    }
    console.log("Assigning issue:", issue, "to", department, officer);
    alert(
      `Issue ${issue.id} assigned to ${officer} (${department}). (Replace with backend API call.)`
    );
  };

  return (
    <div className="d-flex min-vh-100" style={{ background: "var(--color-bg)" }}>
      {/* Sidebar */}
      <aside
        className="border-end bg-light d-flex flex-column"
        style={{ width: 260 }}
      >
        <div className="px-3 py-3 border-bottom">
          <span className="fw-bold fs-5">JanReport</span>
          <div className="small text-muted">MLA / MP Dashboard</div>
        </div>
        <nav className="flex-grow-1 px-2 py-3">
          <div className="small text-uppercase text-muted mb-2">Navigation</div>
          <ul className="nav nav-pills flex-column gap-1">
            <li className="nav-item">
              <NavLink
                to="/mla/overview"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Overview
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/mla/verified"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Verified Issues
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/mla/assigned"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Assigned Issues
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/mla/resolved"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Resolved Issues
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to="/mla/reports"
                className={({ isActive }) =>
                  "nav-link" + (isActive ? " active" : "")
                }
              >
                Reports
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="border-top px-3 py-3 small text-muted">
          Logged in as <span className="fw-semibold">MLA / MP</span>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1 d-flex flex-column">
        {/* Top Bar */}
        <header className="border-bottom bg-white">
          <div className="container-fluid py-2 d-flex justify-content-between align-items-center">
            <div>
              <div className="small text-muted">Constituency</div>
              <select className="form-select form-select-sm">
                <option>Nizamabad Rural</option>
                <option>Nizamabad Urban</option>
              </select>
            </div>
            <div className="d-flex align-items-center gap-3">
              <input
                type="text"
                className="form-control form-control-sm d-none d-md-block"
                placeholder="Search by issue ID / area / citizen"
              />
              <button className="btn btn-link text-muted">
                <i className="bi bi-bell" />
              </button>
              <div className="dropdown">
                <button
                  className="btn btn-light btn-sm dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <span className="me-2">Kavya</span>
                  <span className="badge bg-primary-subtle text-primary border border-primary-subtle">
                    MLA
                  </span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item">Profile</button>
                  </li>
                  <li>
                    <button className="dropdown-item">Settings</button>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <button className="dropdown-item text-danger">Logout</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </header>

        {/* Body with nested routes */}
        <main className="flex-grow-1 py-3">
          <div className="container-fluid">
            {/* Common title + note */}
            <div className="d-flex justify-content-between align-items-center mb-3">
              <div>
                <h5 className="mb-0 fw-semibold">MLA Dashboard</h5>
                <small className="text-muted">
                  Monitor issue resolution progress and assign departments in
                  your constituency.
                </small>
              </div>
            </div>

            <div className="alert alert-info small mb-4">
              <strong>Note:</strong> MLA does <strong>NOT</strong> verify
              issues. Issues shown here are already verified by admin. MLA only{" "}
              <strong>assigns</strong> work to departments/officers and{" "}
              <strong>monitors</strong> progress.
            </div>

            <Routes>
              {/* OVERVIEW PAGE */}
              <Route
                path="overview"
                element={
                  <>
                    <SummarySection
                      stats={stats}
                      resolutionRate={resolutionRate}
                    />
                    <AnalyticsSection
                      stats={stats}
                      categoryData={issuesByCategoryData}
                    />

                    <StatusFilterBar
                      statusFilter={statusFilter}
                      onChange={setStatusFilter}
                      delayedCount={delayedOpenIssuesCount}
                    />
                    <IssuesByStatusSection
                      issues={allIssuesForFilter}
                      statusFilter={statusFilter}
                    />
                  </>
                }
              />

              {/* OTHER PAGES */}
              <Route
                path="verified"
                element={
                  <VerifiedIssuesSection
                    issues={verifiedIssues}
                    onAssign={handleAssign}
                  />
                }
              />
              <Route
                path="assigned"
                element={
                  <AssignedIssuesSection assignedIssues={assignedIssues} />
                }
              />
              <Route
                path="resolved"
                element={
                  <ResolvedIssuesSection resolvedIssues={resolvedIssues} />
                }
              />
              <Route
                path="reports"
                element={<ReportsSection reports={reports} />}
              />

              {/* Default /mla → overview */}
              <Route index element={<Navigate to="overview" replace />} />
              <Route path="*" element={<Navigate to="overview" replace />} />
            </Routes>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-top bg-white py-2 small text-muted text-center">
          © {new Date().getFullYear()} JanReport | Civil Issue Reporting Platform
        </footer>
      </div>
    </div>
  );
};

export default MlaDashboard;
