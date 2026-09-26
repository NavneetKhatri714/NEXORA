import { useEffect, useState } from "react";
import { DEMO_DASHBOARD } from "../../data/mockData";
import "./DashboardPreview.css";

export default function DashboardPreview() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="dash-preview">
      <div className="dash-preview__glow" />
      <div className="glass dash-card">
        <div className="dash-card__top">
          <div>
            <span className="dash-card__label">Target Role</span>
            <h4>{DEMO_DASHBOARD.targetRole}</h4>
          </div>
          <div className="dash-status">
            <span className="dash-status__dot" />
            Live Analysis
          </div>
        </div>

        <div className="dash-readiness">
          <div className="dash-readiness__ring">
            <svg viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="52" className="ring-track" />
              <circle
                cx="60"
                cy="60"
                r="52"
                className="ring-fill"
                style={{
                  strokeDasharray: 2 * Math.PI * 52,
                  strokeDashoffset: animate
                    ? 2 * Math.PI * 52 * (1 - DEMO_DASHBOARD.readiness / 100)
                    : 2 * Math.PI * 52,
                }}
              />
            </svg>
            <div className="dash-readiness__value">
              <strong>{DEMO_DASHBOARD.readiness}%</strong>
              <span>Career Readiness</span>
            </div>
          </div>

          <ul className="dash-skills">
            {DEMO_DASHBOARD.skills.map((skill, i) => (
              <li key={skill.name} style={{ transitionDelay: `${i * 80 + 200}ms` }}>
                <div className="dash-skills__label">
                  <span>{skill.name}</span>
                  <span className="dash-skills__value">{skill.current}/5</span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: animate ? `${(skill.current / 5) * 100}%` : "0%" }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="dash-card__footer">
          <span className="pulse-dot" /> AI updating your roadmap in real time
        </div>
      </div>

      <div className="glass dash-float dash-float--gap">
        <span className="dash-float__title">Next Skill Gap</span>
        <strong>React 2.5 → 4.0</strong>
      </div>
      <div className="glass dash-float dash-float--match">
        <span className="dash-float__title">Role Match</span>
        <strong>92%</strong>
      </div>
    </div>
  );
}
