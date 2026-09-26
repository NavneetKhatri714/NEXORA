import "./ProductRoadmap.css";

const MILESTONES = [
  {
    tag: "Live in Prototype",
    title: "Core Skill-Gap Engine",
    items: ["Profile intake (resume / GitHub / LinkedIn)", "Self-assessment quiz", "Gap analysis + roadmap generator"],
    status: "done",
  },
  {
    tag: "Next",
    title: "Real AI Integrations",
    items: ["Resume & GitHub parsing via LLM", "Live job-market skill demand data", "Recommendation-grade course matching"],
    status: "next",
  },
  {
    tag: "Later",
    title: "Career Intelligence Platform",
    items: ["Mentor matching", "Team / campus dashboards", "Certification-backed skill verification"],
    status: "later",
  },
];

export default function ProductRoadmap() {
  return (
    <section className="section product-roadmap" id="roadmap">
      <div className="container">
        <div className="reveal">
          <span className="section-tag">Roadmap</span>
          <h2 className="section-heading">Where NEXORA is headed after the hackathon.</h2>
          <p className="section-sub">
            This prototype ships the full experience with mock intelligence. Here's how it evolves
            into a production-grade AI career agent.
          </p>
        </div>

        <div className="milestones">
          {MILESTONES.map((m, i) => (
            <div className={`glass milestone reveal reveal-delay-${i + 1}`} key={m.title}>
              <span className={`milestone__tag milestone__tag--${m.status}`}>{m.tag}</span>
              <h3>{m.title}</h3>
              <ul>
                {m.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
