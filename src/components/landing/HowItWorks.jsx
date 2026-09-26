import { PROCESS_STEPS } from "../../data/mockData";
import "./HowItWorks.css";

function StepVisual({ step }) {
  if (step.items) {
    return (
      <ul className="step-visual step-visual--pills">
        {step.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }
  if (step.example) {
    return (
      <div className="step-visual step-visual--gaps">
        {step.example.map((s) => (
          <div key={s.name} className="gap-row">
            <span className="gap-row__name">{s.name}</span>
            <span className="gap-row__value">{s.current}/5</span>
            <span className="gap-row__arrow">→</span>
            <span className="gap-row__value gap-row__value--target">{s.required}/5</span>
          </div>
        ))}
      </div>
    );
  }
  if (step.loop) {
    return (
      <div className="step-visual step-visual--loop">
        {step.loop.map((item, i) => (
          <div className="loop-node" key={item}>
            <span>{item}</span>
            {i < step.loop.length - 1 && <span className="loop-connector">→</span>}
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="step-visual step-visual--pulse">
      <div className="ai-pulse">
        <span />
        <span />
        <span />
      </div>
      <p>Analyzing skill signals across your entire profile…</p>
    </div>
  );
}

export default function HowItWorks() {
  return (
    <section className="section how-it-works" id="how-it-works">
      <div className="container">
        <div className="reveal">
          <span className="section-tag">How NEXORA Works</span>
          <h2 className="section-heading">Five steps from confusion to a career-ready roadmap.</h2>
          <p className="section-sub">
            Every step feeds the next — your profile trains the analysis, the analysis reveals
            the gaps, and the gaps become a living roadmap.
          </p>
        </div>

        <div className="steps">
          {PROCESS_STEPS.map((step, i) => (
            <div className={`step reveal reveal-delay-${(i % 4) + 1}`} key={step.step}>
              <div className="step__meta">
                <span className="step__number">{step.step}</span>
                <div className="step__line" />
              </div>
              <div className="glass step__card">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <StepVisual step={step} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
