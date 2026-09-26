import { useEffect, useState } from "react";
import "./ReadinessCard.css";

export default function ReadinessCard({ readiness, targetRole, roadmapProgress }) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 200);
    return () => clearTimeout(t);
  }, []);

  const circumference = 2 * Math.PI * 54;

  return (
    <div className="glass readiness-card">
      <div className="readiness-card__ring">
        <svg viewBox="0 0 130 130">
          <circle cx="65" cy="65" r="54" className="ring-track" />
          <circle
            cx="65"
            cy="65"
            r="54"
            className="ring-fill"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: animate ? circumference * (1 - readiness / 100) : circumference,
            }}
          />
        </svg>
        <div className="readiness-card__value">
          <strong>{readiness}%</strong>
          <span>Career Ready</span>
        </div>
      </div>

      <div className="readiness-card__meta">
        <span className="readiness-card__label">Target Role</span>
        <h3>{targetRole}</h3>
        <div className="readiness-card__stat">
          <span>Roadmap progress</span>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: animate ? `${roadmapProgress}%` : "0%" }} />
          </div>
          <span className="readiness-card__stat-value">{roadmapProgress}%</span>
        </div>
      </div>
    </div>
  );
}
