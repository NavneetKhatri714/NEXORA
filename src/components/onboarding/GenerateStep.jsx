import { useEffect, useState } from "react";
import "./GenerateStep.css";

const CHECKLIST = [
  "Resume analyzed",
  "Skills extracted",
  "Target role analyzed",
  "Skill gaps identified",
  "Personalized roadmap generated",
];

export default function GenerateStep({ onFinish }) {
  const [visibleCount, setVisibleCount] = useState(0);
  const done = visibleCount >= CHECKLIST.length;

  useEffect(() => {
    if (visibleCount >= CHECKLIST.length) return;
    const t = setTimeout(() => setVisibleCount((c) => c + 1), 650);
    return () => clearTimeout(t);
  }, [visibleCount]);

  return (
    <div className="generate-step">
      <div className={`generate-orb ${done ? "is-done" : ""}`}>
        <div className="generate-orb__ring" />
        <div className="generate-orb__ring generate-orb__ring--2" />
        <span>{done ? "✓" : "AI"}</span>
      </div>

      <h3>{done ? "Your roadmap is ready." : "Analyzing your profile…"}</h3>

      <ul className="generate-checklist">
        {CHECKLIST.map((item, i) => (
          <li key={item} className={i < visibleCount ? "is-visible" : ""}>
            <span className="generate-checklist__mark">✓</span>
            {item}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className="btn btn-primary generate-step__cta"
        disabled={!done}
        onClick={onFinish}
      >
        {done ? "View My Dashboard →" : "Analyzing…"}
      </button>
    </div>
  );
}
