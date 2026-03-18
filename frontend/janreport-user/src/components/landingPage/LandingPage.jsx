import { useNavigate } from "react-router-dom";
import { useAuthHook } from "../../context/AuthContext";
import "./LandingPage.css";
import janreportVideo from "../../assets/Data/janreport.mp4";
import React, { useRef, useState } from "react";

import {
  AlertTriangle,
  CheckCircle2,
  Users,
  BarChart3,
  MapPin,
  Camera,
  ShieldCheck,
  Eye,
} from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthHook();
  const authed = isAuthenticated();

const handlePrimaryCTA = () => {
  navigate("/report-issue");
};



  const impact = {
    issuesReported: 260,
    issuesResolved: 124,
    citizensOnboard: 482,
  };

  const issueCards = [
    {
      id: "card-1",
      title: "Broken bridge between two mandals",
      tag: "Infrastructure",
      img: "/issues/bridge-damage.jpg",
    },
    {
      id: "card-2",
      title: "Drainage overflow near government hospital",
      tag: "Public Health",
      img: "/issues/drainage-overflow.jpg",
    },
    {
      id: "card-3",
      title: "Water pipeline leakage on main road",
      tag: "Water Supply",
      img: "/issues/water-leak.jpg",
    },
  ];

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

const videoRef = useRef(null);
const [isPlaying, setIsPlaying] = useState(false);

const handleTogglePlay = () => {
  if (!videoRef.current) return;

  if (isPlaying) {
    videoRef.current.pause();
    setIsPlaying(false);
  } else {
    videoRef.current.play();
    setIsPlaying(true);
  }
};



  return (
    <div className="app-content">
      <div className="page-inner">
        {/* =============== 1. HERO SECTION =============== */}
        <section id="hero" className="landing-section container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 text-start">
              <p className="text-uppercase small mb-2 text-muted d-flex align-items-center gap-2">
                <ShieldCheck size={18} className="text-primary" />
                Citizen-to-MLA / MP Issue Reporting
              </p>

              <h1 className="hero-title fw-bold mb-3">
                Report. Track. Resolve.
                <br />
                Civic Issues Made Accountable.
              </h1>

              <p className="hero-subtitle mb-4">
                JanReport is a citizen-first platform to report real civic issues
                and ensure they reach the right administration and elected
                representatives with full transparency.
              </p>

              <div className="d-flex flex-wrap gap-3">
                <button
                  type="button"
                  className="btn btn-primary btn-lg px-4 fw-semibold d-flex align-items-center gap-2"
                  onClick={handlePrimaryCTA}
                >
                  <AlertTriangle size={18} />
                  <span>{authed ? "Report an Issue" : "Report an Issue"}</span>
                </button>

                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg px-4 d-flex align-items-center gap-2"
                  onClick={() => scrollTo("why-janreport")}
                >
                  <BarChart3 size={18} />
                  <span>Why JanReport?</span>
                </button>
              </div>

              <p className="small mt-3 mb-0 text-muted">
                Your report. Their responsibility. Our transparency.
              </p>
            </div>

            <div className="col-lg-5">
           <div className="hero-video-wrapper">
  <div
    className="hero-video-card shadow-lg rounded-4 overflow-hidden"
    onClick={handleTogglePlay}
  >
    <video
      ref={videoRef}
      className="hero-video"
      src={janreportVideo}
      loop
      muted
      playsInline
    />

    {/* Dark overlay */}
    <div className="hero-video-overlay" />

    {/* Play button */}
    {!isPlaying && (
      <div className="hero-play-button">
        ▶
      </div>
    )}

    {/* Caption */}
    <div className="hero-video-caption">
      Citizens using JanReport to raise civic issues
    </div>
  </div>
</div>



            </div>
          </div>
        </section>

        {/* =============== 2. OUR IMPACT =============== */}
        <section id="impact" className="landing-section container">
          <div className="mb-4 text-start">
            <h2 className="section-title mb-1">Our Impact</h2>
            <p className="text-muted mb-0">
              Real issues. Real actions. Real change.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-12 col-md-4">
              <div className="card landing-card h-100">
                <div className="card-body text-start">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="icon-pill bg-primary-subtle">
                      <AlertTriangle size={20} className="text-primary" />
                    </div>
                    <p className="text-uppercase small mb-0 text-muted">
                      Issues Reported
                    </p>
                  </div>
                  <h3 className="fw-bold mb-1">{impact.issuesReported}+</h3>
                  <p className="small mb-0 text-muted">
                    Citizen-reported issues across roads, water, sanitation and safety.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card landing-card h-100">
                <div className="card-body text-start">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="icon-pill bg-success-subtle">
                      <CheckCircle2 size={20} className="text-success" />
                    </div>
                    <p className="text-uppercase small mb-0 text-muted">
                      Issues Resolved
                    </p>
                  </div>
                  <h3 className="fw-bold mb-1">{impact.issuesResolved}+</h3>
                  <p className="small mb-0 text-muted">
                    Problems resolved with a clear trace of actions taken.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-12 col-md-4">
              <div className="card landing-card h-100">
                <div className="card-body text-start">
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <div className="icon-pill bg-info-subtle">
                      <Users size={20} className="text-info" />
                    </div>
                    <p className="text-uppercase small mb-0 text-muted">
                      Citizens Onboard
                    </p>
                  </div>
                  <h3 className="fw-bold mb-1">{impact.citizensOnboard}+</h3>
                  <p className="small mb-0 text-muted">
                    Residents using JanReport to strengthen their locality.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =============== 3. WHY CHOOSE JANREPORT =============== */}
        <section id="why-janreport" className="landing-section container">
          <div className="mb-4 text-start">
            <h2 className="section-title mb-1">Why Choose JanReport?</h2>
            <p className="text-muted mb-0">
              Designed for citizens, aligned with public representatives.
            </p>
          </div>

          <div className="row g-4 text-start">
            <div className="col-md-4">
              <div className="card landing-card h-100">
                <div className="card-body">
                  <div className="icon-pill mb-3 bg-primary-subtle">
                    <MapPin size={20} className="text-primary" />
                  </div>
                  <h6 className="fw-semibold mb-2">Direct & Location-Aware</h6>
                  <p className="small text-muted mb-0">
                    Every report captures precise location and context so it can
                    be acted on by the right local body or representative.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card landing-card h-100">
                <div className="card-body">
                  <div className="icon-pill mb-3 bg-warning-subtle">
                    <Camera size={20} className="text-warning" />
                  </div>
                  <h6 className="fw-semibold mb-2">Evidence–Backed Reports</h6>
                  <p className="small text-muted mb-0">
                    Add photos and details so issues are harder to ignore and
                    easier to prioritise.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card landing-card h-100">
                <div className="card-body">
                  <div className="icon-pill mb-3 bg-info-subtle">
                    <Eye size={20} className="text-info" />
                  </div>
                  <h6 className="fw-semibold mb-2">Transparent Status View</h6>
                  <p className="small text-muted mb-0">
                    Track your issue as it moves from Reported to Under Review
                    and Resolved – all in one place.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =============== 4. REPORT INFO SECTION =============== */}
        <section id="report-info" className="landing-section container">
          <div className="row align-items-center g-4">
            <div className="col-lg-7 text-start">
              <h2 className="section-title mb-3">Ready to Report an Issue?</h2>
              <p className="text-muted mb-3" style={{ maxWidth: "640px" }}>
                Use JanReport for serious civic problems: damaged bridges,
                blocked drainage, water supply failures, unsafe roads, street
                lighting, public health and safety concerns.
              </p>

              <ul className="list-unstyled mb-4">
                <li className="d-flex align-items-start gap-2 mb-2">
                  <AlertTriangle size={16} className="text-warning mt-1" />
                  <span className="small text-muted">
                    Clearly describe what is happening and how people are affected.
                  </span>
                </li>
                <li className="d-flex align-items-start gap-2 mb-2">
                  <MapPin size={16} className="text-primary mt-1" />
                  <span className="small text-muted">
                    Add an accurate location or landmark for quicker response.
                  </span>
                </li>
                <li className="d-flex align-items-start gap-2">
                  <Camera size={16} className="text-info mt-1" />
                  <span className="small text-muted">
                    Attach clear photos when possible to support your report.
                  </span>
                </li>
              </ul>

              <button
                type="button"
                className="btn btn-primary px-4 fw-semibold d-flex align-items-center gap-2"
                onClick={handlePrimaryCTA}
              >
                <AlertTriangle size={18} />
                <span>
                  {authed ? "Report an Issue Now" : "Report an Issue Now"}
                </span>
              </button>
            </div>

            <div className="col-lg-5">
              <div className="card landing-card">
                <div className="card-body text-start">
                  <h6 className="fw-semibold mb-2">Example Issue Template</h6>
                  <p className="small mb-1">
                    <strong>Title:</strong> Chronic waterlogging at main market road
                  </p>
                  <p className="small mb-1">
                    <strong>Description:</strong> After every rainfall the entire
                    stretch near the market is filled with stagnant water,
                    causing health and safety issues.
                  </p>
                  <p className="small mb-0">
                    <strong>Location:</strong> Ward 8, Main Market Road, near
                    municipal office gate.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =============== 5. IMAGE–BASED ISSUE CARDS ===============
        <section id="reported-issues" className="landing-section container">
          <div className="mb-4 text-start">
            <h2 className="section-title mb-1">Recently Reported Issues</h2>
            <p className="text-muted mb-0">
              A visual snapshot of the kind of issues citizens raise on JanReport.
            </p>
          </div>

          <div className="row g-4">
            {issueCards.map((card) => (
              <div key={card.id} className="col-12 col-md-4">
                <div className="card landing-card issue-card h-100">
                  <div className="issue-card-image-wrapper">
                    <img
                      src={card.img}
                      alt={card.title}
                      className="issue-card-image"
                    />
                    <span className="issue-card-tag badge bg-light text-dark d-flex align-items-center gap-1">
                      <AlertTriangle size={12} />
                      {card.tag}
                    </span>
                  </div>
                  <div className="card-body text-start">
                    <h6 className="fw-semibold mb-0">{card.title}</h6>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section> */}

        {/* =============== 6. OUR MISSION =============== */}
        <section id="mission" className="landing-section container pb-5">
          <div className="card landing-card">
            <div className="card-body text-start p-4 p-md-5">
              <h2 className="section-title mb-3">Our Mission</h2>
              <p className="text-muted mb-3" style={{ maxWidth: "720px" }}>
                JanReport aims to bridge the gap between citizens and governance
                by providing a simple, transparent and accountable digital
                channel for reporting critical civic issues.
              </p>
              <p className="text-muted mb-3" style={{ maxWidth: "720px" }}>
                When real issues are captured correctly and shared with responsible
                authorities, it leads to faster resolutions, better infrastructure
                and stronger trust between people and their representatives.
              </p>
              <p className="mb-0 fw-semibold" style={{ color: "var(--color-accent)" }}>
                One report at a time, we move towards more responsive governance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default LandingPage;
