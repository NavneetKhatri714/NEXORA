import { useState } from "react";
import { ASSESSMENT_LEVELS, SKILL_QUESTIONS } from "../../data/mockData";
import "./AssessmentStep.css";

export default function AssessmentStep({ skills, onComplete, onBack }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const skill = skills[index];
  const question =
    SKILL_QUESTIONS[skill.name] || `How comfortable are you with ${skill.name}?`;
  const isLast = index === skills.length - 1;

  const handleSelect = (level) => {
    const next = { ...answers, [skill.name]: level };
    setAnswers(next);
    setTimeout(() => {
      if (isLast) {
        onComplete(next);
      } else {
        setIndex((i) => i + 1);
      }
    }, 350);
  };

  const handleBackQuestion = () => {
    if (index === 0) {
      onBack();
    } else {
      setIndex((i) => i - 1);
    }
  };

  return (
    <div>
      <div className="assessment-progress">
        <span>
          Question {index + 1} of {skills.length}
        </span>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${((index + 1) / skills.length) * 100}%` }}
          />
        </div>
      </div>

      <h3 className="assessment-question">{question}</h3>
      <p className="assessment-skill">Skill: {skill.name}</p>

      <div className="assessment-options">
        {ASSESSMENT_LEVELS.map((level) => (
          <button
            key={level.value}
            type="button"
            className={`assessment-option ${answers[skill.name] === level.value ? "is-selected" : ""}`}
            onClick={() => handleSelect(level.value)}
          >
            <span className="assessment-option__value">{level.value}</span>
            <span className="assessment-option__label">{level.label}</span>
          </button>
        ))}
      </div>

      <div className="onboarding__nav">
        <button type="button" className="btn btn-ghost" onClick={handleBackQuestion}>
          ← Back
        </button>
        <span className="assessment-hint">Select an answer to continue automatically</span>
      </div>
    </div>
  );
}
