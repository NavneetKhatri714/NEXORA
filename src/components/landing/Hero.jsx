import { Link } from "react-router-dom";
import DashboardPreview from "./DashboardPreview";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero">
      <div className="glow-orb hero__orb hero__orb--1" />
      <div className="glow-orb hero__orb hero__orb--2" />

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="section-tag">AI Skill-Gap Analysis &amp; Learning Agent</span>
          <h1 className="hero__title">
            Turn Your <span className="gradient-text">Skill Gaps</span> Into Your Career Roadmap.
          </h1>
          <p className="hero__subtext">
            NEXORA uses AI to analyze your profile, identify the skills required for your target
            role, and create a personalized learning roadmap that adapts as you learn.
          </p>
          <div className="hero__actions">
            <Link to="/auth" className="btn btn-primary">
              Build My Roadmap →
            </Link>
            <a href="#how-it-works" className="btn btn-ghost">
              Explore Demo
            </a>
          </div>

          <div className="hero__stats">
            <div>
              <strong>8+</strong>
              <span>Career tracks</span>
            </div>
            <div>
              <strong>AI</strong>
              <span>Adaptive roadmap engine</span>
            </div>
            <div>
              <strong>100%</strong>
              <span>Runs in your browser</span>
            </div>
          </div>
        </div>

        <div className="hero__visual">
          <DashboardPreview />
        </div>
      </div>
    </section>
  );
}
