import { Link } from "react-router-dom";
import "./FinalCta.css";

export default function FinalCta() {
  return (
    <section className="section final-cta">
      <div className="container">
        <div className="glass final-cta__panel reveal">
          <div className="glow-orb final-cta__orb" />
          <span className="section-tag">Ready when you are</span>
          <h2>Stop guessing what to learn next.</h2>
          <p>Build your first AI-generated roadmap in under three minutes — no backend, no signup friction.</p>
          <div className="final-cta__actions">
            <Link to="/auth" className="btn btn-primary">
              Build My Roadmap →
            </Link>
            <a href="#how-it-works" className="btn btn-ghost">
              See How It Works
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
