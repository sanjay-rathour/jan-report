import React from "react";
import "./About.css";

const About = () => {
  return (
    <main className="about-wrapper">
      {/* HERO SECTION */}
      <section className="about-hero-bg py-5 mb-5">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-7">
              <h1 className="hero-title display-4 mb-3">About JanReport</h1>
              <p className="about-lead mb-4">
                JanReport is a next-generation civic platform bridging the gap between 
                citizens and governance through transparent, evidence-based reporting.
              </p>
              <div className="d-flex gap-3 flex-wrap">
                <span className="badge-pill-light"><Target size={16}/> Accountability</span>
                <span className="badge-pill-light"><Users2 size={16}/> Community</span>
                <span className="badge-pill-light"><Rocket size={16}/> Action</span>
              </div>
            </div>
            </div>
            </div>
    </section>
    </main>
  );
};

export default About;