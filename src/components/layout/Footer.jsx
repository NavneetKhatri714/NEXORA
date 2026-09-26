import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="nx-footer" id="about">
      <div className="container nx-footer__inner">
        <div className="nx-footer__brand">
          <div className="nx-logo">
            <span className="nx-logo__mark">N</span>
            <span className="nx-logo__text">NEXORA</span>
          </div>
          <p>From Skill Gaps to Career-Ready.</p>
          <p className="nx-footer__built">Built by ARCHEOPTERYX</p>
        </div>

        <div className="nx-footer__col">
          <h4>Product</h4>
          <a href="#how-it-works">How It Works</a>
          <a href="#features">Features</a>
          <a href="#roadmap">Roadmap</a>
        </div>

        <div className="nx-footer__col">
          <h4>Company</h4>
          <a href="#about">About</a>
          <Link to="/auth">Get Started</Link>
        </div>

        <div className="nx-footer__col">
          <h4>Prototype</h4>
          <p className="nx-footer__note">
            NEXORA is a hackathon prototype. All AI results are simulated with
            mock data and run entirely in your browser — no backend required.
          </p>
        </div>
      </div>

      <div className="container nx-footer__bottom">
        <span>© {new Date().getFullYear()} NEXORA</span>
        <span>Team ARCHEOPTERYX</span>
      </div>
    </footer>
  );
}
