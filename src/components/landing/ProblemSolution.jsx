import { PROBLEM_CARDS } from "../../data/mockData";
import "./ProblemSolution.css";

export default function ProblemSolution() {
  return (
    <section className="section problem" id="problem">
      <div className="container">
        <div className="reveal">
          <span className="section-tag">The Problem</span>
          <h2 className="section-heading">
            Knowing Your Dream Job Is Easy. <br />
            Knowing What To Learn Is Not.
          </h2>
        </div>

        <div className="problem__grid">
          {PROBLEM_CARDS.map((card, i) => (
            <div className={`glass problem__card reveal reveal-delay-${i + 1}`} key={card.index}>
              <span className="problem__index">{card.index}</span>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
            </div>
          ))}
        </div>

        <div className="problem__transition reveal reveal-delay-4">
          <div className="problem__arrow">↓</div>
          <p>
            NEXORA turns this confusion into a <span className="gradient-text">measurable roadmap.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
