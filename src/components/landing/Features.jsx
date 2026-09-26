import "./Features.css";

const FEATURES = [
  {
    glyph: "◈",
    title: "AI Skill Analysis",
    description: "Parses your resume, GitHub and LinkedIn to infer real skill levels — not just keywords.",
  },
  {
    glyph: "◎",
    title: "Personalized Roadmap",
    description: "A sequenced Learn → Practice → Build → Test plan built around your exact gaps.",
  },
  {
    glyph: "⬡",
    title: "Multi-Source Profile",
    description: "Combine resume, GitHub, LinkedIn and self-assessment into a single skill graph.",
  },
  {
    glyph: "◇",
    title: "Career Readiness Score",
    description: "A live percentage showing how close you are to your target role, updated as you grow.",
  },
  {
    glyph: "⟡",
    title: "Skill Validation",
    description: "Short AI skill-checks confirm you've actually reached the required level — not just watched a video.",
  },
  {
    glyph: "◐",
    title: "Adaptive Updates",
    description: "The roadmap re-plans itself automatically as your skills, goals or role change.",
  },
];

export default function Features() {
  return (
    <section className="section features" id="features">
      <div className="container">
        <div className="reveal">
          <span className="section-tag">Features</span>
          <h2 className="section-heading">Everything you need to close the gap — nothing you don't.</h2>
        </div>

        <div className="features__grid">
          {FEATURES.map((f, i) => (
            <div className={`glass feature__card reveal reveal-delay-${(i % 4) + 1}`} key={f.title}>
              <span className="feature__glyph">{f.glyph}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
